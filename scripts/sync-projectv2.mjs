#!/usr/bin/env node
import process from 'process'

const TOKEN = process.env.PROJECT_TOKEN || process.env.GITHUB_TOKEN
if (!TOKEN) {
  console.error('Missing PROJECT_TOKEN or GITHUB_TOKEN')
  process.exit(1)
}

const GH_GRAPHQL = 'https://api.github.com/graphql'
const GH_REST = 'https://api.github.com'

async function graphql(query, variables) {
  const res = await fetch(GH_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'sync-projectv2-script',
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2))
  return json
}

async function rest(path) {
  const res = await fetch(`${GH_REST}${path}`, {
    headers: { Authorization: `bearer ${TOKEN}`, 'User-Agent': 'sync-projectv2-script' },
  })
  return res.json()
}

function usage() {
  console.log('Usage: node scripts/sync-projectv2.mjs --owner OWNER --repo REPO --project-number 1 --issue 10 --status "In progress"')
}

async function findIssueNodeId(owner, repo, issueNumber) {
  const q = `query($owner:String!,$repo:String!,$number:Int!){ repository(owner:$owner,name:$repo){ issue(number:$number){ id } } }`
  const res = await graphql(q, { owner, repo, number: parseInt(issueNumber, 10) })
  if (!res || !res.data || !res.data.repository || !res.data.repository.issue) return null
  return res.data.repository.issue.id
}

async function getProjectV2(owner, repo, number) {
  const q = `query($owner:String!,$repo:String!,$number:Int!){ repository(owner:$owner,name:$repo){ projectV2(number:$number){ id title fields(first:50){ nodes{ __typename ... on ProjectV2FieldCommon{ id name } ... on ProjectV2SingleSelectField{ id name options{ id name } } } } items(first:200){ nodes{ id content{ __typename ... on Issue{ number } } } } } } }`
  const res = await graphql(q, { owner, repo, number: parseInt(number, 10) })
  if (!res || !res.data || !res.data.repository) return null
  return res.data.repository.projectV2
}

async function updateItemStatus(itemId, fieldId, optionId) {
  const mutation = `mutation($input:ProjectV2UpdateItemFieldValueInput!){ projectV2UpdateItemFieldValue(input:$input){ projectV2Item{ id } } }`
  const input = { itemId, fieldId, value: { singleSelectOptionId: optionId } }
  const res = await graphql(mutation, { input })
  return res
}

async function addItemByContent(projectId, contentId) {
  const mutation = `mutation($projectId:ID!,$contentId:ID!){ addProjectV2ItemByContent(input:{projectId:$projectId,contentId:$contentId}){ item{ id } } }`
  const res = await graphql(mutation, { projectId, contentId })
  return res
}

async function main() {
  const argv = process.argv.slice(2)
  const opts = {}
  for (let i = 0; i < argv.length; i += 2) {
    const k = argv[i]
    const v = argv[i + 1]
    if (!v) break
    opts[k.replace(/^--/, '')] = v
  }

  const owner = opts.owner
  const repo = opts.repo
  const projectNumber = opts['project-number'] || process.env.PROJECT_NUMBER || '1'
  const issueNumber = opts.issue || process.env.ISSUE_NUMBER
  const targetStatus = opts.status || process.env.TARGET_STATUS
  if (!owner || !repo || !issueNumber || !targetStatus) {
    usage(); process.exit(2)
  }

  const issueNodeId = await findIssueNodeId(owner, repo, issueNumber)
  if (!issueNodeId) { console.error('Unable to resolve issue node id for', owner, repo, issueNumber); process.exit(3) }

  // Prefer explicit env IDs when provided
  const PROJECT_ID = process.env.PROJECT_ID || ''
  const STATUS_FIELD_ID = process.env.STATUS_FIELD_ID || process.env.STATUSFIELDID || ''

  // Try option id from env vars (OPTION_*)
  const normalized = (s) => (s || '').replace(/\s+/g, '').toLowerCase()
  let optionId = null
  for (const k of Object.keys(process.env)) {
    if (!k.startsWith('OPTION_')) continue
    const name = k.replace(/^OPTION_/, '')
    if (normalized(name) === normalized(targetStatus)) { optionId = process.env[k]; break }
  }

  if (PROJECT_ID && STATUS_FIELD_ID && optionId) {
    const created = await addItemByContent(PROJECT_ID, issueNodeId)
    const itemId = created && created.data && created.data.addProjectV2ItemByContent && created.data.addProjectV2ItemByContent.item && created.data.addProjectV2ItemByContent.item.id
    if (!itemId) { console.error('Could not obtain project item id using PROJECT_ID and issue node id', created); process.exit(7) }
    console.log('Updating item', itemId, 'field', STATUS_FIELD_ID, 'to option', optionId)
    const r = await updateItemStatus(itemId, STATUS_FIELD_ID, optionId)
    console.log('Update result:', JSON.stringify(r, null, 2))
    return
  }

  // Fallback: query project schema
  const project = await getProjectV2(owner, repo, projectNumber)
  if (!project) { console.error('Project not found'); process.exit(4) }

  // find status field
  const statusField = (project.fields && project.fields.nodes || []).find(f => f.__typename === 'ProjectV2SingleSelectField' && f.name && f.name.toLowerCase().includes('status'))
  if (!statusField) { console.error('Status field not found'); process.exit(5) }

  if (!optionId) {
    const opt = (statusField.options && statusField.options.nodes) ? statusField.options.nodes.find(o => normalized(o.name) === normalized(targetStatus) || normalized(o.name) === normalized(targetStatus.replace(/-/g, ''))) : null
    if (opt) optionId = opt.id
  }
  if (!optionId) { console.error('Option not found for status:', targetStatus); console.error('Available:', statusField.options && statusField.options.nodes && statusField.options.nodes.map(o => o.name)); process.exit(6) }

  // find or create item
  let item = (project.items && project.items.nodes) ? project.items.nodes.find(it => it.content && it.content.number === parseInt(issueNumber, 10)) : null
  if (!item) {
    const created = await addItemByContent(project.id, issueNodeId)
    item = { id: created && created.data && created.data.addProjectV2ItemByContent && created.data.addProjectV2ItemByContent.item && created.data.addProjectV2ItemByContent.item.id }
  }
  const itemId = item && item.id
  if (!itemId) { console.error('Unable to determine project item id'); process.exit(8) }

  console.log('Updating item', itemId, 'field', statusField.id, 'to option', optionId)
  const r = await updateItemStatus(itemId, statusField.id, optionId)
  console.log('Update result:', JSON.stringify(r, null, 2))
}

main().catch(err => { console.error('Fatal error', err); process.exit(99) })
