import jslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import { flatConfigs as importX } from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { config as defineConfig, configs as tslint } from 'typescript-eslint'

import {
  createCustomPerfectionistConfig,
  createDisableFilesConfig,
  createDisableRulesConfig,
  createEnableRulesConfig,
  createESXConfig
} from './configs'

import type {
  CreateCustomPerfectionistConfig,
  CreateDisableFilesConfig,
  CreateDisableRulesConfig,
  CreateEnableRulesConfig,
  CreateESXConfig
} from './configs'
import type {
  ConfigArray,
  InfiniteDepthConfigWithExtends
} from 'typescript-eslint'

interface CreateESLintConfig
  extends CreateCustomPerfectionistConfig,
    CreateDisableFilesConfig,
    CreateDisableRulesConfig,
    CreateEnableRulesConfig,
    CreateESXConfig {
  configs: InfiniteDepthConfigWithExtends[]
}

/**
 * Creates a standardized ESLint configuration with sensible defaults and customization options.
 *
 * @param {Partial<CreateESLintConfig>} config - Configuration options for customizing the ESLint setup.
 * @returns {ConfigArray} A complete ESLint configuration array ready to use.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const eslintConfig = createESLintConfig();
 *
 * // With custom options
 * const eslintConfig = createESLintConfig({
 *   configs: [{ rules: { 'no-unused-vars': 'off' } }],
 *   disableFiles: ['**\/*.test.ts'],
 *   disableRules: ['no-console'],
 *   enableRules: ['no-debugger'],
 *   noUnresolvedIgnore: ['^@/'],
 *   rules: { 'perfectionist/sort-objects': 'error' },
 *   sortImportsGroups: [
 *     ['side-effect', 'side-effect-style'],
 *     'style',
 *     'builtin',
 *     'external',
 *     ['internal', 'subpath'],
 *     ['parent', 'sibling', 'index'],
 *     'unknown',
 *     'import',
 *     'type'
 *   ],
 *   sortImportsInternalPattern: ['^@/']
 * });
 * ```
 */
export function createESLintConfig(
  config?: Partial<CreateESLintConfig>
): ConfigArray {
  const realConfig: CreateESLintConfig = {
    configs: config?.configs ?? [],
    disableFiles: config?.disableFiles ?? [],
    disableRules: config?.disableRules ?? [],
    enableRules: config?.enableRules ?? [],
    esTarget: config?.esTarget ?? 'esnext',
    noUnresolvedIgnore: config?.noUnresolvedIgnore ?? [],
    rules: config?.rules ?? {},
    sortImportsGroups: config?.sortImportsGroups ?? [],
    sortImportsInternalPattern: config?.sortImportsInternalPattern ?? []
  }
  return defineConfig(
    importX.recommended,
    importX.typescript,
    jslint.configs.recommended,
    perfectionist.configs['recommended-natural'],
    react.configs.flat.recommended ?? [],
    react.configs.flat['jsx-runtime'] ?? [],
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.recommended,
    stylistic.configs.recommended,
    tslint.recommended,
    createESXConfig(realConfig),
    createDisableFilesConfig(realConfig),
    createDisableRulesConfig(realConfig),
    createEnableRulesConfig(realConfig),
    createCustomPerfectionistConfig(realConfig),
    ...realConfig.configs,
    prettierRecommended,
    prettierConfig
  )
}
