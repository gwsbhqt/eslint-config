import { findUpSync } from 'find-up'

export const __dirname = import.meta.dirname
export const gitignorePath = findUpSync('.gitignore', { cwd: __dirname })
export const tsconfigPath = findUpSync('tsconfig.json', { cwd: __dirname })

export const defaultDisableRules = Object.freeze([
  '@typescript-eslint/ban-ts-comment',
  '@typescript-eslint/no-empty-object-type',
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-namespace',
  '@typescript-eslint/no-this-alias',
  '@typescript-eslint/no-unsafe-function-type',
  'import-x/no-named-as-default-member',
  'react-refresh/only-export-components',
  'react/prop-types',
  'unicorn/filename-case',
  'unicorn/import-style',
  'unicorn/no-array-callback-reference',
  'unicorn/no-array-for-each',
  'unicorn/no-null',
  'unicorn/no-process-exit',
  'unicorn/no-this-assignment',
  'unicorn/prefer-spread',
  'unicorn/prevent-abbreviations'
])

export const defaultEnableRules = Object.freeze([
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
  'unicorn/prefer-import-meta-properties'
])
