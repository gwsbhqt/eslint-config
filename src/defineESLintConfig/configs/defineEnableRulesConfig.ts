import type { ConfigWithFalsy } from '../types'

export function defineEnableRulesConfig(
  enableRules?: readonly string[] | string[]
): ConfigWithFalsy {
  if (!enableRules?.length) return
  return {
    rules: Object.fromEntries(enableRules.map((rule) => [rule, 2]))
  }
}
