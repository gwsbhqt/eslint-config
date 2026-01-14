import { globalIgnores } from 'eslint/config'

import type { ConfigWithFalsy } from '../types'

export function defineGlobalIgnoresConfig(
  globalIgnoresArgs?: string[]
): ConfigWithFalsy {
  if (!globalIgnoresArgs?.length) return
  return globalIgnores(globalIgnoresArgs)
}
