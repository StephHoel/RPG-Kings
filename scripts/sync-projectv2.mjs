#!/usr/bin/env node
import fetch from 'node-fetch'
import process from 'process'

const TOKEN = process.env.PROJECT_TOKEN || process.env.GITHUB_TOKEN
if (!TOKEN) {
  console.error('Missing PROJECT_TOKEN or GITHUB_TOKEN')
  process.exit(1)
}

function graphql(query, variables) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'sync-projectv2-script',
    },
    body: JSON.stringify({ query, variables }),
  }).then((r) => r.json())
}

async function getProjectData(owner, repo, projectNumber) {
  const query = `query($owner:String!, $repo:String!, $number:Int!){ repository(owner:$owner,name:$repo){ projectV2(number:$number){ id number title fields(first:50){ nodes { __typename ... on ProjectV2SingleSelectField{ id name options(first:200){ nodes{ id name } } } ... on ProjectV2FieldCommon{ id name } } } items(first:200){ nodes{ id content{ ... on Issue{ number } } } } } } }`
  const res = await graphql(query, { owner, repo, number: projectNumber })
  return res.data.repository.projectV2
}

async function updateItemStatus(itemId, fieldId, optionId) {
  const mutation = `mutation($input:ProjectV2UpdateItemFieldValueInput!){ projectV2UpdateItemFieldValue(input:$input){ projectV2Item{ id } } }`
  const input = { itemId, fieldId, value: { singleSelectOptionId: optionId } }
  const res = await graphql(mutation, { input })
  return res
}

function usage() {
  console.log(
    'Usage: node scripts/sync-projectv2.mjs --owner OWNER --repo REPO --project-number 1 --issue 10 --status "In progress"'
  )
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
  const projectNumber = parseInt(opts['project-number'] || '1', 10)
  const issueNumber = parseInt(opts.issue, 10)
  const targetStatus = opts.status
  if (!owner || !repo || !issueNumber || !targetStatus) {
    usage()
    process.exit(2)
  }

  const project = await getProjectData(owner, repo, projectNumber)
  if (!project) {
    console.error('Project not found')
    process.exit(3)
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
    process.exit(4)
  }

  // find option id
  const option = statusField.options.nodes.find(
    (o) =>
      o.name.toLowerCase() === targetStatus.toLowerCase() ||
      o.name.replace(/\s+/g, '').toLowerCase() === targetStatus.replace(/\s+/g, '').toLowerCase()
  )
  if (!option) {
    console.error('Option not found for status:', targetStatus)
    console.error(
      'Available:',
      statusField.options.nodes.map((o) => o.name)
    )
    process.exit(5)
  }

  // find item id for issue
  const item = project.items.nodes.find((it) => it.content && it.content.number === issueNumber)
  if (!item) {
    console.error('Project item not found for issue', issueNumber)
    process.exit(6)
  }

  const itemId = item.id
  const fieldId = statusField.id
  const optionId = option.id

  console.log('Updating item', itemId, 'field', fieldId, 'to option', optionId)
  const r = await updateItemStatus(itemId, fieldId, optionId)
  console.log(JSON.stringify(r, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(99)
})
