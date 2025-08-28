import type { FlatConfig } from '@eslint/compat'

export interface CreateDisableRulesConfig {
  disableRules: string[]
}

export function createDisableRulesConfig(
  config: CreateDisableRulesConfig
): FlatConfig {
  const defaultRules = [
    '@typescript-eslint/ban-ts-comment',
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/no-namespace',
    '@typescript-eslint/no-unsafe-function-type',
    'react-refresh/only-export-components',
    'react/prop-types'
  ]
  const disableRules = defaultRules.concat(config.disableRules)
  return {
    rules: Object.fromEntries(disableRules.map((rule) => [rule, 0]))
  }
}
