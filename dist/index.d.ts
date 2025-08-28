import { ConfigArray, InfiniteDepthConfigWithExtends } from "typescript-eslint";
import "@eslint/compat";
import { Linter } from "eslint";
import { Config } from "prettier";

//#region src/createESLintConfig/rules/createImportXNoUnresolved.d.ts
interface CreateImportXNoUnresolved {
  noUnresolvedIgnore: string[];
}
//#endregion
//#region src/createESLintConfig/rules/createPerfectionistSortImports.d.ts
interface CreatePerfectionistSortImports {
  sortImportsGroups: string[] | string[][];
  sortImportsInternalPattern: string[];
}
//#endregion
//#region src/createESLintConfig/configs/createCustomPerfectionistConfig.d.ts
interface CreateCustomPerfectionistConfig extends CreateImportXNoUnresolved, CreatePerfectionistSortImports {
  rules: Linter.RulesRecord;
}
//#endregion
//#region src/createESLintConfig/configs/createDisableFilesConfig.d.ts
interface CreateDisableFilesConfig {
  disableFiles: string[];
}
//#endregion
//#region src/createESLintConfig/configs/createDisableRulesConfig.d.ts
interface CreateDisableRulesConfig {
  disableRules: string[];
}
//#endregion
//#region src/createESLintConfig/configs/createEnableRulesConfig.d.ts
interface CreateEnableRulesConfig {
  enableRules: string[];
}
//#endregion
//#region src/createESLintConfig/index.d.ts
interface CreateESLintConfig extends CreateCustomPerfectionistConfig, CreateDisableFilesConfig, CreateDisableRulesConfig, CreateEnableRulesConfig {
  configs: InfiniteDepthConfigWithExtends[];
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
declare function createESLintConfig(config?: Partial<CreateESLintConfig>): ConfigArray;
//#endregion
//#region src/createPrettierConfig/index.d.ts
interface CreatePrettierConfigOptions extends Omit<Config, 'overrides' | 'plugins'> {
  overrides?: Record<string, Config>;
  plugins?: Config['plugins'];
}
/**
 * Creates a standardized Prettier configuration with sensible defaults and plugin support.
 *
 * @param {CreatePrettierConfigOptions} options - Configuration options for customizing the Prettier setup
 * @returns {Config} A complete Prettier configuration object ready to use
 *
 * @example
 * ```typescript
 * // Basic usage
 * const config = createPrettierConfig()
 *
 * // With custom options and overrides
 * const config = createPrettierConfig({
 *   printWidth: 100,
 *   overrides: {
 *     '*.json': { printWidth: 120 },
 *     '*.md': { proseWrap: 'always' }
 *   },
 *   plugins: ['prettier-plugin-organize-imports']
 * })
 * ```
 */
declare function createPrettierConfig(options?: CreatePrettierConfigOptions): Config;
//#endregion
export { createESLintConfig, createPrettierConfig };