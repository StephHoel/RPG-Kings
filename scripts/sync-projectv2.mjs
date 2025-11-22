#!/usr/bin/env node
import process from 'process'

/*
  sync-projectv2.mjs
  - Finds/creates a ProjectV2 item for an issue and updates a single-select status field.
  - Prefers explicit env IDs (PROJECT_ID, STATUS_FIELD_ID, OPTION_*) to avoid brittle schema queries.
  - Posts an issue comment when `COMMENT_ON_RESULT=true`.
*/

const TOKEN = process.env.PROJECT_TOKEN || process.env.GITHUB_TOKEN
if (!TOKEN) {
  console.error('Missing PROJECT_TOKEN or GITHUB_TOKEN')
  process.exit(1)
}

const GH_GRAPHQL = 'https://api.github.com/graphql'
const GH_REST = 'https://api.github.com'

function normalizeKey(s) {
  if (!s) return ''
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

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

async function rest(path, opts = {}) {
  const res = await fetch(
    `${GH_REST}${path}`,
    Object.assign(
      { headers: { Authorization: `bearer ${TOKEN}`, 'User-Agent': 'sync-projectv2-script' } },
      opts
    )
  )
  return res.json()
}

async function postComment(owner, repo, issueNumber, body) {
  try {
    const path = `/repos/${owner}/${repo}/issues/${issueNumber}/comments`
    const res = await fetch(`${GH_REST}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TOKEN}`,
        'User-Agent': 'sync-projectv2-script',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    })
    return res.json()
  } catch (err) {
    console.error('Failed to post comment:', err)
    return null
  }
}

async function withRetry(fn, attempts = 3, baseMs = 300) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      const wait = baseMs * Math.pow(2, i)
      console.error(
        `Attempt ${i + 1} failed, retrying after ${wait}ms:`,
        err && err.message ? err.message : err
      )
      await new Promise((r) => setTimeout(r, wait))
    }
  }
  throw lastErr
}

async function findIssueNodeId(owner, repo, issueNumber) {
  const q = `query($owner:String!,$repo:String!,$number:Int!){ repository(owner:$owner,name:$repo){ issue(number:$number){ id } } }`
  const res = await graphql(q, { owner, repo, number: parseInt(issueNumber, 10) })
  if (
    res &&
    res.data &&
    res.data.repository &&
    res.data.repository.issue &&
    res.data.repository.issue.id
  )
    return res.data.repository.issue.id
  // REST fallback
  const r = await rest(`/repos/${owner}/${repo}/issues/${issueNumber}`)
  return r && r.node_id ? r.node_id : null
}

async function findProjectItemForIssue(owner, repo, issueNumber, projectId) {
  const q = `query($owner:String!,$repo:String!,$number:Int!){ repository(owner:$owner,name:$repo){ issue(number:$number){ projectItems(first:50){ nodes{ id project{ id } } } } } }`
  const res = await graphql(q, { owner, repo, number: parseInt(issueNumber, 10) })
  if (!res || !res.data || !res.data.repository || !res.data.repository.issue) return null
  const nodes =
    (res.data.repository.issue.projectItems && res.data.repository.issue.projectItems.nodes) || []
  const matched = nodes.find((n) => n.project && n.project.id === projectId)
  return matched && matched.id ? matched.id : null
}

async function getProjectV2(owner, repo, number) {
  const projectQ = `query($owner:String!,$repo:String!,$number:Int!,$fieldsCursor:String,$itemsCursor:String){ repository(owner:$owner,name:$repo){ projectV2(number:$number){ id title fields(first:100, after:$fieldsCursor){ pageInfo{ hasNextPage endCursor } nodes{ __typename ... on ProjectV2FieldCommon{ id name } ... on ProjectV2SingleSelectField{ id name options(first:100){ nodes{ id name } pageInfo{ hasNextPage endCursor } } } } } items(first:100, after:$itemsCursor){ pageInfo{ hasNextPage endCursor } nodes{ id content{ __typename ... on Issue{ number } } } } } } }`

  const project = await graphql(projectQ, { owner, repo, number: parseInt(number, 10) })
  if (!project || !project.data || !project.data.repository) return null
  const p = project.data.repository.projectV2

  // paginate fields
  if (p.fields && p.fields.pageInfo && p.fields.pageInfo.hasNextPage) {
    let allFieldNodes = Array.from(p.fields.nodes || [])
    let cursor = p.fields.pageInfo.endCursor
    while (cursor) {
      const res = await graphql(projectQ, {
        owner,
        repo,
        number: parseInt(number, 10),
        fieldsCursor: cursor,
      })
      const repoObj = res && res.data && res.data.repository
      const proj = repoObj && repoObj.projectV2
      if (!proj || !proj.fields) break
      allFieldNodes = allFieldNodes.concat(proj.fields.nodes || [])
      if (proj.fields.pageInfo && proj.fields.pageInfo.hasNextPage)
        cursor = proj.fields.pageInfo.endCursor
      else cursor = null
    }
    p.fields.nodes = allFieldNodes
  }

  // paginate items
  if (p.items && p.items.pageInfo && p.items.pageInfo.hasNextPage) {
    let allItems = Array.from(p.items.nodes || [])
    let cursor = p.items.pageInfo.endCursor
    while (cursor) {
      const res = await graphql(projectQ, {
        owner,
        repo,
        number: parseInt(number, 10),
        itemsCursor: cursor,
      })
      const repoObj = res && res.data && res.data.repository
      const proj = repoObj && repoObj.projectV2
      if (!proj || !proj.items) break
      allItems = allItems.concat(proj.items.nodes || [])
      if (proj.items.pageInfo && proj.items.pageInfo.hasNextPage)
        cursor = proj.items.pageInfo.endCursor
      else cursor = null
    }
    p.items.nodes = allItems
  }

  return p
}

async function addItemByContent(projectId, contentId) {
  const mutation = `mutation($projectId:ID!,$contentId:ID!){ addProjectV2ItemByContent(input:{projectId:$projectId,contentId:$contentId}){ item{ id } } }`
  return await withRetry(async () => await graphql(mutation, { projectId, contentId }))
}

async function updateItemStatus(itemId, fieldId, optionId, projectId = null) {
  // Use the schema-defined input shape for updateProjectV2ItemFieldValue
  const mutation = `mutation($input:UpdateProjectV2ItemFieldValueInput!){ updateProjectV2ItemFieldValue(input:$input){ projectV2Item{ id } } }`
  const input = {
    projectId: projectId || null,
    itemId,
    fieldId,
    value: { singleSelectOptionId: optionId },
  }
  // projectId will be set by caller if available (we'll attempt to fill it below when possible)

  try {
    const res = await withRetry(async () => await graphql(mutation, { input }))
    if (
      res &&
      res.data &&
      res.data.updateProjectV2ItemFieldValue &&
      res.data.updateProjectV2ItemFieldValue.projectV2Item
    )
      return res
  } catch (err) {
    console.error(
      'GraphQL updateProjectV2ItemFieldValue failed:',
      err && err.message ? err.message : err
    )
  }

  // If all GraphQL mutation attempts failed, surface an error
  // Try REST fallback for Projects v2 (inertia preview)
  try {
    const restRes = await withRetry(async () => {
      const path = `/projects/columns/items/${itemId}`
      // The Projects v2 REST API is in preview and field updates vary; use PATCH with a body setting field id -> optionId
      // We'll call the items/fields endpoint if available via preview header. Construct a best-effort payload.
      const body = { field_id: fieldId, value: optionId }
      const res = await fetch(`${GH_REST}${path}`, {
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${TOKEN}`,
          'User-Agent': 'sync-projectv2-script',
          Accept: 'application/vnd.github.inertia-preview+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`REST update failed: ${res.status} ${txt}`)
      }
      return res.json()
    })
    return restRes
  } catch (err) {
    throw new Error(
      'All updateProjectV2ItemFieldValue mutation variants failed and REST fallback also failed: ' +
        (err && err.message ? err.message : String(err))
    )
  }
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
  const projectNumber = opts['project-number'] || process.env.PROJECT_NUMBER || '1'
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

  // Prefer explicit env IDs when provided
  const PROJECT_ID = process.env.PROJECT_ID || ''
  const STATUS_FIELD_ID = process.env.STATUS_FIELD_ID || process.env.STATUSFIELDID || ''

  // Build normalized map from OPTION_* env vars
  const normalizedEnvOptions = {}
  for (const k of Object.keys(process.env)) {
    if (!k.startsWith('OPTION_')) continue
    const rawName = k.replace(/^OPTION_/, '')
    normalizedEnvOptions[normalizeKey(rawName)] = process.env[k]
  }

  const normalizedTarget = normalizeKey(targetStatus)
  // If the provided status looks like an option id (hex-like, short), accept it directly.
  const looksLikeOptionId = /^[0-9a-fA-F]{6,}$/.test(targetStatus)
  let optionId = looksLikeOptionId ? targetStatus : normalizedEnvOptions[normalizedTarget] || null

  if (PROJECT_ID && STATUS_FIELD_ID && optionId) {
    // Prefer to find existing project item for this issue to avoid calling unavailable create mutations
    let itemId = await findProjectItemForIssue(owner, repo, issueNumber, PROJECT_ID)
    if (!itemId) {
      try {
        const created = await addItemByContent(PROJECT_ID, issueNodeId)
        itemId =
          created &&
          created.data &&
          created.data.addProjectV2ItemByContent &&
          created.data.addProjectV2ItemByContent.item &&
          created.data.addProjectV2ItemByContent.item.id
      } catch (err) {
        console.error(
          'Could not create project item via GraphQL mutation:',
          err && err.message ? err.message : err
        )
      }
    }
    if (!itemId) {
      console.error('Could not obtain or create project item id for this issue. Aborting.')
      if (process.env.COMMENT_ON_RESULT === 'true')
        await postComment(
          owner,
          repo,
          issueNumber,
          `Failed to find or create project item for status update to **${targetStatus}**.`
        )
      process.exit(7)
    }
    console.log('Updating item', itemId, 'field', STATUS_FIELD_ID, 'to option', optionId)
    try {
      const r = await updateItemStatus(itemId, STATUS_FIELD_ID, optionId, PROJECT_ID)
      console.log('Update result:', JSON.stringify(r, null, 2))
      if (process.env.COMMENT_ON_RESULT === 'true') {
        await postComment(
          owner,
          repo,
          issueNumber,
          `Project board updated to **${targetStatus}** (item ${itemId}).`
        )
      }
    } catch (err) {
      console.error(
        'Failed updating item status (env path):',
        err && err.message ? err.message : err
      )
      if (process.env.COMMENT_ON_RESULT === 'true') {
        await postComment(
          owner,
          repo,
          issueNumber,
          `Failed to update Project board to **${targetStatus}**: ${
            err && err.message ? err.message : String(err)
          }`
        )
      }
      process.exit(10)
    }
    return
  }

  const project = await getProjectV2(owner, repo, projectNumber)
  if (!project) {
    console.error('Project not found')
    process.exit(4)
  }

  const statusField = ((project.fields && project.fields.nodes) || []).find(
    (f) =>
      f.__typename === 'ProjectV2SingleSelectField' &&
      f.name &&
      f.name.toLowerCase().includes('status')
  )
  if (!statusField) {
    console.error('Status field not found')
    process.exit(5)
  }

  if (!optionId) {
    const opt =
      statusField.options && statusField.options.nodes
        ? statusField.options.nodes.find((o) => normalizeKey(o.name) === normalizedTarget)
        : null
    if (opt) optionId = opt.id
  }
  if (!optionId) {
    console.error('Option not found for status:', targetStatus)
    console.error(
      'Available:',
      statusField.options &&
        statusField.options.nodes &&
        statusField.options.nodes.map((o) => o.name)
    )
    process.exit(6)
  }

  // find or create item
  let item =
    project.items && project.items.nodes
      ? project.items.nodes.find(
          (it) => it.content && it.content.number === parseInt(issueNumber, 10)
        )
      : null
  if (!item) {
    const created = await addItemByContent(project.id, issueNodeId)
    item = {
      id:
        created &&
        created.data &&
        created.data.addProjectV2ItemByContent &&
        created.data.addProjectV2ItemByContent.item &&
        created.data.addProjectV2ItemByContent.item.id,
    }
  }
  const itemId = item && item.id
  if (!itemId) {
    console.error('Unable to determine project item id')
    process.exit(8)
  }

  console.log('Updating item', itemId, 'field', statusField.id, 'to option', optionId)
  const r = await updateItemStatus(itemId, statusField.id, optionId, project.id)
  console.log('Update result:', JSON.stringify(r, null, 2))
  if (process.env.COMMENT_ON_RESULT === 'true') {
    await postComment(
      owner,
      repo,
      issueNumber,
      `Project board updated to **${targetStatus}** (item ${itemId}).`
    )
  }
}

main().catch((err) => {
  console.error('Fatal error', err)
  process.exit(99)
})
