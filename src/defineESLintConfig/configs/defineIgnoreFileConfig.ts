import { includeIgnoreFile } from '@eslint/compat'

import type { ConfigWithFalsy } from '../types'

export function defineIgnoreFileConfig(IgnoreFile?: string): ConfigWithFalsy {
  if (!IgnoreFile) return
  return includeIgnoreFile(IgnoreFile)
}
