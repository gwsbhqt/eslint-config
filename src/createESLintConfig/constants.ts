import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { findUpSync } from 'find-up'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
export const gitignorePath = findUpSync('.gitignore', { cwd: __dirname })
export const tsconfigPath = findUpSync('tsconfig.json', { cwd: __dirname })
