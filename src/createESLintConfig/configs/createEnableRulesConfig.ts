import type { FlatConfig } from '@eslint/compat'

export interface CreateEnableRulesConfig {
  enableRules: string[]
}

export function createEnableRulesConfig(
  config: CreateEnableRulesConfig
): FlatConfig {
  const defaultEnableRules = [
    '@stylistic/lines-between-class-members',
    '@typescript-eslint/consistent-type-imports',
    'import-x/consistent-type-specifier-style',
    'no-useless-rename',
    'object-shorthand',
    'react/self-closing-comp'
  ]
  const enableRules = defaultEnableRules.concat(config.enableRules)
  return {
    rules: Object.fromEntries(enableRules.map((rule) => [rule, 2]))
  }
}
