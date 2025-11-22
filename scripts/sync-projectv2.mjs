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
  if (json.errors) {
    console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2))
  }
  return json
}

async function rest(path) {
  const res = await fetch(`${GH_REST}${path}`, {
    headers: { Authorization: `bearer ${TOKEN}`, 'User-Agent': 'sync-projectv2-script' },
  })
  return res.json()
}

function usage() {
  console.log(
    'Usage: node scripts/sync-projectv2.mjs --owner OWNER --repo REPO --project-number 1 --issue 10 --status "In progress"'
  )
}

async function findIssueNodeId(owner, repo, issueNumber) {
  // Try GraphQL first
  const q = `query($owner:String!, $repo:String!, $number:Int!){ repository(owner:$owner,name:$repo){ issue(number:$number){ node_id id number } } }`
  try {
    const g = await graphql(q, { owner, repo, number: parseInt(issueNumber, 10) })
    if (
      g &&
      g.data &&
      g.data.repository &&
      g.data.repository.issue &&
      g.data.repository.issue.node_id
    ) {
      return g.data.repository.issue.node_id
    }
  } catch (e) {
    // fallthrough to REST
  }

  // REST fallback
  const p = `/repos/${owner}/${repo}/issues/${issueNumber}`
  const r = await rest(p)
  if (r && r.node_id) return r.node_id
  return null
}

async function getProjectData(owner, repo, projectNumber, projectIdEnv) {
  // If projectId is provided via env, use it to fetch fields and items
  if (projectIdEnv) {
    const q = `query($projectId:ID!){ node(id:$projectId){ ... on ProjectV2{ id title fields(first:50){ nodes{ __typename ... on ProjectV2SingleSelectField{ id name options(first:200){ nodes{ id name } } } ... on ProjectV2FieldCommon{ id name } } } items(first:200){ nodes{ id content{ __typename ... on Issue{ number } } } } } } }`
    const res = await graphql(q, { projectId: projectIdEnv })
    if (!res || !res.data) {
      console.error('GraphQL did not return data for projectId:', projectIdEnv, res)
      return null
    }
    return res.data.node
  }

  const q2 = `query($owner:String!, $repo:String!, $number:Int!){ repository(owner:$owner,name:$repo){ projectV2(number:$number){ id number title fields(first:50){ nodes{ __typename ... on ProjectV2SingleSelectField{ id name options(first:200){ nodes{ id name } } } ... on ProjectV2FieldCommon{ id name } } } items(first:200){ nodes{ id content{ __typename ... on Issue{ number } } } } } } }`
  const res = await graphql(q2, { owner, repo, number: parseInt(projectNumber, 10) })
  if (!res || !res.data || !res.data.repository) {
    console.error('GraphQL did not return repository/projectV2 for', owner, repo, projectNumber, res)
    return null
  }
  return res.data.repository.projectV2
}

async function updateItemStatus(itemId, fieldId, optionId) {
  const mutation = `mutation($input:ProjectV2UpdateItemFieldValueInput!){ projectV2UpdateItemFieldValue(input:$input){ projectV2Item{ id } } }`
  const input = { itemId, fieldId, value: { singleSelectOptionId: optionId } }
  const res = await graphql(mutation, { input })
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
  const projectIdEnv = process.env.PROJECT_ID || ''
  const issueNumber = opts.issue || process.env.ISSUE_NUMBER
  const targetStatus = opts.status || process.env.TARGET_STATUS

  if (!owner || !repo || !issueNumber || !targetStatus) {
    usage()
    process.exit(2)
  }

  const issueNodeId = await findIssueNodeId(owner, repo, issueNumber)
  if (!issueNodeId) {
    console.error('Unable to resolve issue node id for', owner, repo, issueNumber)
    process.exit(3)
  }

  const project = await getProjectData(owner, repo, projectNumber, projectIdEnv)
  if (!project) {
    console.error('Project not found')
    process.exit(4)
  }

  // Find status field
  let statusField = null
  for (const f of project.fields.nodes) {
    if (
      f.__typename === 'ProjectV2SingleSelectField' &&
      f.name &&
      f.name.toLowerCase().includes('status')
    ) {
      statusField = f
      break
    }
  }
  if (!statusField) {
    console.error('Status field not found')
    process.exit(5)
  }

  // Try to resolve option id via env mapping first
  const normalized = (s) => s.replace(/\s+/g, '').toLowerCase()
  let optionId = null
  // check env vars for option ids by normalized name
  for (const k of Object.keys(process.env)) {
    if (!k.startsWith('OPTION_')) continue
    const name = k.replace(/^OPTION_/, '')
    if (normalized(name) === normalized(targetStatus)) {
      optionId = process.env[k]
      break
    }
  }

  // fallback: search field options
  if (!optionId) {
    const opt = statusField.options.nodes.find(
      (o) =>
        normalized(o.name) === normalized(targetStatus) ||
        normalized(o.name) === normalized(targetStatus.replace(/-/g, ''))
    )
    if (opt) optionId = opt.id
  }

  if (!optionId) {
    console.error('Option not found for status:', targetStatus)
    console.error(
      'Available:',
      statusField.options.nodes.map((o) => o.name)
    )
    process.exit(6)
  }

  // find existing project item for this issue
  let item = project.items.nodes.find(
    (it) => it.content && it.content.number === parseInt(issueNumber, 10)
  )

  // If item not present, create it
  if (!item) {
    console.log('Project item not found; creating item for issue node id', issueNodeId)
    const createMutation = `mutation($projectId:ID!, $contentId:ID!){ addProjectV2ItemByContent(input:{projectId:$projectId, contentId:$contentId}){ item{ id } } }`
    const created = await graphql(createMutation, { projectId: project.id, contentId: issueNodeId })
    item = { id: created.addProjectV2ItemByContent.item.id }
  }

  const itemId = item.id
  const fieldId = statusField.id

  console.log('Updating item', itemId, 'field', fieldId, 'to option', optionId)
  const r = await updateItemStatus(itemId, fieldId, optionId)
  console.log('Update result:', JSON.stringify(r, null, 2))
}

main().catch((err) => {
  console.error('Fatal error', err)
  process.exit(99)
})
