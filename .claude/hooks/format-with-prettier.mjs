// PostToolUse hook: runs Prettier over any file Claude writes or edits.
// Reads the hook payload from stdin, formats tool_input.file_path, and always
// exits 0 so a formatting failure can never block an edit.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const prettierBin = resolve(projectRoot, 'node_modules/prettier/bin/prettier.cjs')

let raw = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => (raw += chunk))
process.stdin.on('end', () => {
  let file
  try {
    file = JSON.parse(raw)?.tool_input?.file_path
  } catch {}

  if (!file || !existsSync(file) || !existsSync(prettierBin)) process.exit(0)
  if (!resolve(file).startsWith(projectRoot)) process.exit(0)

  try {
    execFileSync(
      process.execPath,
      [prettierBin, '--write', '--ignore-unknown', '--log-level', 'warn', resolve(file)],
      { cwd: projectRoot, stdio: 'ignore' },
    )
  } catch {}

  process.exit(0)
})
