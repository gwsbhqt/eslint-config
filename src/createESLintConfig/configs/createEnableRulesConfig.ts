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
    'import-x/first',
    'import-x/newline-after-import',
    'import-x/no-absolute-path',
    'import-x/no-empty-named-blocks',
    'import-x/no-useless-path-segments',
    'no-useless-rename',
    'object-shorthand',
    'react/self-closing-comp',
    'unicorn/better-regex',
    'unicorn/consistent-destructuring',
    'unicorn/custom-error-definition',
    'unicorn/prefer-import-meta-properties'
  ]
  const enableRules = defaultEnableRules.concat(config.enableRules)
  return {
    rules: Object.fromEntries(enableRules.map((rule) => [rule, 2]))
  }
}
