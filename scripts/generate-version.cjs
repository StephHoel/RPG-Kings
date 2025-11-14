const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')

function gitShortHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (e) {
    return null
  }
}

function gitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch (e) {
    return null
  }
}

function main() {
  const pkgPath = path.resolve(__dirname, '..', 'package.json')
  let pkg = { version: '0.0.0' }
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  } catch (e) {}

  const version = pkg.version || '0.0.0'
  const commit = gitShortHash()
  const branch = gitBranch()
  const generatedAt = new Date().toISOString()

  const out = {
    version,
    commit,
    branch,
    generatedAt,
  }

  const outDir = path.resolve(__dirname, '..', 'public')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'version.json')
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

main()
