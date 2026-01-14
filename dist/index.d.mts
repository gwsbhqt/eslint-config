import { Config } from "eslint/config";
import "@eslint/compat";
import { ConfigWithExtendsArray } from "@eslint/config-helpers";
import { Linter } from "eslint";
import { Config as Config$1 } from "prettier";

//#region src/defineESLintConfig/rules/defineImportXNoUnresolvedRule.d.ts
interface DefineImportXNoUnresolvedRule {
  noUnresolvedIgnore: string[];
}
//#endregion
//#region src/defineESLintConfig/rules/definePerfectionistSortImportsRule.d.ts
interface DefinePerfectionistSortImportsRule {
  sortImportsGroups: string[] | string[][];
  sortImportsInternalPattern: string[];
}
//#endregion
//#region src/defineESLintConfig/configs/defineCustomPerfectionistConfig.d.ts
interface DefineCustomPerfectionistConfig extends DefineImportXNoUnresolvedRule, DefinePerfectionistSortImportsRule {
  rules: Linter.RulesRecord;
}
//#endregion
//#region src/defineESLintConfig/configs/defineESXConfig.d.ts
type ESTarget = 'es3' | 'es5' | 'es6' | 'es2015' | 'es2016' | 'es2017' | 'es2018' | 'es2019' | 'es2020' | 'es2021' | 'es2022' | 'es2023' | 'es2024' | 'esnext';
//#endregion
//#region src/defineESLintConfig/index.d.ts
interface DefineESLintConfig extends DefineCustomPerfectionistConfig {
  configs: ConfigWithExtendsArray[];
  disableRules: string[];
  enableRules: string[];
  esTarget: ESTarget;
  globalIgnores: string[];
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
declare function defineESLintConfig(config?: Partial<DefineESLintConfig>): Config[];
//#endregion
//#region src/definePrettierConfig/index.d.ts
interface DefinePrettierConfigOptions extends Omit<Config$1, 'overrides' | 'plugins'> {
  overrides?: Record<string, Config$1>;
  plugins?: Config$1['plugins'];
}
/**
 * Defines a standardized Prettier configuration with sensible defaults and plugin support.
 *
 * @param {DefinePrettierConfigOptions} options - Configuration options for customizing the Prettier setup
 * @returns {Config} A complete Prettier configuration object ready to use
 *
 * @example
 * ```typescript
 * // Basic usage
 * const config = definePrettierConfig()
 *
 * // With custom options and overrides
 * const config = definePrettierConfig({
 *   printWidth: 100,
 *   overrides: {
 *     '*.json': { printWidth: 120 },
 *     '*.md': { proseWrap: 'always' }
 *   },
 *   plugins: ['prettier-plugin-organize-imports']
 * })
 * ```
 */
declare function definePrettierConfig(options?: DefinePrettierConfigOptions): Config$1;
//#endregion
export { defineESLintConfig, definePrettierConfig };