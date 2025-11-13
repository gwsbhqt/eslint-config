import { findUpSync } from 'find-up'

export const __dirname = import.meta.dirname
export const gitignorePath = findUpSync('.gitignore', { cwd: __dirname })
export const tsconfigPath = findUpSync('tsconfig.json', { cwd: __dirname })
