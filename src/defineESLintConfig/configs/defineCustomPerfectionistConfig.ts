import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import globals from 'globals'

import { tsconfigPath } from '../constants'
import {
  defineImportXNoUnresolvedRule,
  definePerfectionistSortImportsRule
} from '../rules'

import type {
  DefineImportXNoUnresolvedRule,
  DefinePerfectionistSortImportsRule
} from '../rules'
import type { FlatConfig } from '@eslint/compat'
import type { Linter } from 'eslint'

export interface DefineCustomPerfectionistConfig
  extends DefineImportXNoUnresolvedRule, DefinePerfectionistSortImportsRule {
  rules: Linter.RulesRecord
}

export function defineCustomPerfectionistConfig(
  config: DefineCustomPerfectionistConfig
): FlatConfig {
  return {
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        2,
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'import-x/no-unresolved': defineImportXNoUnresolvedRule(config),
      'no-empty': [2, { allowEmptyCatch: true }],
      'perfectionist/sort-exports': [
        2,
        {
          groups: ['value-export', 'type-export'],
          newlinesBetween: 1
        }
      ],
      'perfectionist/sort-imports': definePerfectionistSortImportsRule(config),
      'unicorn/consistent-function-scoping': [
        2,
        { checkArrowFunctions: false }
      ],
      'unicorn/no-useless-undefined': [2, { checkArguments: false }],
      ...config.rules
    },
    settings: {
      'import/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: tsconfigPath
        })
      ],
      react: {
        version: 'detect'
      }
    }
  }
}
