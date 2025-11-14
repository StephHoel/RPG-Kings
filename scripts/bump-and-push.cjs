const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function readPkg() {
  const p = path.resolve(__dirname, '..', 'package.json')
  return { path: p, json: JSON.parse(fs.readFileSync(p, 'utf8')) }
}

function writePkg(p, json) {
  fs.writeFileSync(p, JSON.stringify(json, null, 2) + '\n', 'utf8')
}

function bumpVersion(version) {
  const parts = version.split('.').map(Number)
  if (parts.length !== 3) return version
  parts[2] = parts[2] + 1
  return parts.join('.')
}

function git(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString().trim()
}

function main() {
  const { path: pkgPath, json: pkg } = readPkg()
  const oldVersion = pkg.version || '0.0.0'
  const newVersion = bumpVersion(oldVersion)
  pkg.version = newVersion
  writePkg(pkgPath, pkg)

  git('git add package.json')
  git(`git commit -m "chore(release): v${newVersion}"`)
  const branch = git('git rev-parse --abbrev-ref HEAD')
  git(`git push origin ${branch}`)
  console.log('Bumped', oldVersion, '→', newVersion, 'and pushed to', branch)
}

try {
  main()
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
