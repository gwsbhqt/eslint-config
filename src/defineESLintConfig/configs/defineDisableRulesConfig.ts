import type { ConfigWithFalsy } from '../types'

export function defineDisableRulesConfig(
  disableRules?: readonly string[] | string[]
): ConfigWithFalsy {
  if (!disableRules?.length) return
  return {
    rules: Object.fromEntries(disableRules.map((rule) => [rule, 0]))
  }
}
