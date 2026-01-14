import jslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import { flatConfigs as importX } from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import { configs as reactHooks } from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unicorn from 'eslint-plugin-unicorn'
import { defineConfig } from 'eslint/config'
import { configs as tslint } from 'typescript-eslint'

import {
  defineCustomPerfectionistConfig,
  defineDisableRulesConfig,
  defineEnableRulesConfig,
  defineESXConfig,
  defineGlobalIgnoresConfig,
  defineIgnoreFileConfig
} from './configs'
import {
  defaultDisableRules,
  defaultEnableRules,
  gitignorePath
} from './constants'

import type { DefineCustomPerfectionistConfig } from './configs'
import type { InfiniteConfigWithFalsy } from './types'
import type { ConfigWithExtendsArray } from '@eslint/config-helpers'
import type { ESTarget } from 'eslint-plugin-es-x'
import type { Config } from 'eslint/config'

interface DefineESLintConfig extends DefineCustomPerfectionistConfig {
  configs: ConfigWithExtendsArray[]
  disableRules: string[]
  enableRules: string[]
  esTarget: ESTarget
  globalIgnores: string[]
}

/**
 * Defines a standardized ESLint configuration with sensible defaults and customization options.
 *
 * @param {Partial<DefineESLintConfig>} config - Configuration options for customizing the ESLint setup.
 * @returns {Config[]} A complete ESLint configuration array ready to use.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const eslintConfig = defineESLintConfig();
 *
 * // With custom options
 * const eslintConfig = defineESLintConfig({
 *   configs: [{ rules: { 'no-unused-vars': 'off' } }],
 *   disableRules: ['no-console'],
 *   enableRules: ['no-debugger'],
 *   globalIgnores: ['**\/*.test.ts'],
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
export function defineESLintConfig(
  config?: Partial<DefineESLintConfig>
): Config[] {
  const realConfig: DefineESLintConfig = {
    configs: config?.configs ?? [],
    disableRules: config?.disableRules ?? [],
    enableRules: config?.enableRules ?? [],
    esTarget: config?.esTarget ?? 'esnext',
    globalIgnores: config?.globalIgnores ?? [],
    noUnresolvedIgnore: config?.noUnresolvedIgnore ?? [],
    rules: config?.rules ?? {},
    sortImportsGroups: config?.sortImportsGroups ?? [],
    sortImportsInternalPattern: config?.sortImportsInternalPattern ?? []
  }
  const infiniteConfig: InfiniteConfigWithFalsy[] = [
    importX.recommended,
    importX.typescript,
    jslint.configs.recommended,
    perfectionist.configs['recommended-natural'],
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.flat['recommended-latest'],
    reactRefresh.configs.recommended,
    stylistic.configs.recommended,
    tslint.recommended,
    unicorn.configs.recommended,
    defineCustomPerfectionistConfig(realConfig),
    defineESXConfig(realConfig.esTarget),
    defineGlobalIgnoresConfig(realConfig.globalIgnores),
    defineIgnoreFileConfig(gitignorePath),
    ...realConfig.configs,
    defineEnableRulesConfig(defaultEnableRules),
    defineDisableRulesConfig(defaultDisableRules),
    defineEnableRulesConfig(realConfig.enableRules),
    defineDisableRulesConfig(realConfig.disableRules),
    prettierRecommended,
    prettierConfig
  ]
  return defineConfig(infiniteConfig.filter(Boolean))
}
