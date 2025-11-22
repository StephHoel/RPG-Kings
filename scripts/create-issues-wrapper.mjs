#!/usr/bin/env node
import { spawn } from 'child_process'
const args = process.argv.slice(2)
if (args.length < 2) {
  console.error('Usage: node create-issues-wrapper.mjs <type> <title> [body]')
  process.exit(1)
}

const script = './scripts/create-issues.sh'
const isWin = process.platform === 'win32'
const cmd = isWin ? 'bash' : script
const cmdArgs = isWin ? [script, ...args] : args

const p = spawn(cmd, cmdArgs, { stdio: 'inherit' })
p.on('close', (code) => process.exit(code))
