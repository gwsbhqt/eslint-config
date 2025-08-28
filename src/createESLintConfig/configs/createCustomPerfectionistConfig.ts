import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import globals from 'globals'

import { tsconfigPath } from '../constants'
import {
  createImportXNoUnresolved,
  createPerfectionistSortImports
} from '../rules'

import type {
  CreateImportXNoUnresolved,
  CreatePerfectionistSortImports
} from '../rules'
import type { FlatConfig } from '@eslint/compat'
import type { Linter } from 'eslint'

export interface CreateCustomPerfectionistConfig
  extends CreateImportXNoUnresolved,
    CreatePerfectionistSortImports {
  rules: Linter.RulesRecord
}

export function createCustomPerfectionistConfig(
  config: CreateCustomPerfectionistConfig
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
      'import-x/no-unresolved': createImportXNoUnresolved(config),
      'no-empty': [2, { allowEmptyCatch: true }],
      'perfectionist/sort-exports': [
        2,
        {
          groups: ['value-export', 'type-export'],
          newlinesBetween: 1
        }
      ],
      'perfectionist/sort-imports': createPerfectionistSortImports(config),
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
