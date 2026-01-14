import jslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import { flatConfigs } from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import { configs } from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import { configs as configs$1 } from "typescript-eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import globals from "globals";
import { findUpSync } from "find-up";
import esX from "eslint-plugin-es-x";
import { includeIgnoreFile } from "@eslint/compat";

//#region src/defineESLintConfig/constants.ts
const __dirname = import.meta.dirname;
const gitignorePath = findUpSync(".gitignore", { cwd: __dirname });
const tsconfigPath = findUpSync("tsconfig.json", { cwd: __dirname });
const defaultDisableRules = Object.freeze([
	"@typescript-eslint/ban-ts-comment",
	"@typescript-eslint/no-empty-object-type",
	"@typescript-eslint/no-explicit-any",
	"@typescript-eslint/no-namespace",
	"@typescript-eslint/no-this-alias",
	"@typescript-eslint/no-unsafe-function-type",
	"@typescript-eslint/triple-slash-reference",
	"import-x/no-named-as-default-member",
	"react-refresh/only-export-components",
	"react/prop-types",
	"unicorn/filename-case",
	"unicorn/import-style",
	"unicorn/no-array-callback-reference",
	"unicorn/no-array-for-each",
	"unicorn/no-null",
	"unicorn/no-process-exit",
	"unicorn/no-this-assignment",
	"unicorn/prefer-spread",
	"unicorn/prevent-abbreviations"
]);
const defaultEnableRules = Object.freeze([
	"@stylistic/lines-between-class-members",
	"@typescript-eslint/consistent-type-imports",
	"import-x/consistent-type-specifier-style",
	"import-x/first",
	"import-x/newline-after-import",
	"import-x/no-absolute-path",
	"import-x/no-empty-named-blocks",
	"import-x/no-useless-path-segments",
	"no-useless-rename",
	"object-shorthand",
	"react/self-closing-comp",
	"unicorn/better-regex",
	"unicorn/consistent-destructuring",
	"unicorn/prefer-import-meta-properties"
]);

//#endregion
//#region src/defineESLintConfig/rules/defineImportXNoUnresolvedRule.ts
function defineImportXNoUnresolvedRule(config) {
	return [2, { ignore: [
		String.raw`^(~|@|#)\w+/`,
		String.raw`^(bun|node|deno):`,
		String.raw`\.(svg|json)$`
	].concat(config.noUnresolvedIgnore) }];
}

//#endregion
//#region src/defineESLintConfig/rules/definePerfectionistSortImportsRule.ts
function definePerfectionistSortImportsRule(config) {
	return [2, {
		groups: config.sortImportsGroups.length > 0 ? config.sortImportsGroups : [
			["side-effect", "side-effect-style"],
			"style",
			"builtin",
			"external",
			["internal", "subpath"],
			[
				"parent",
				"sibling",
				"index"
			],
			"unknown",
			"import",
			"type"
		],
		internalPattern: [
			"^~/.+",
			"^@/.+",
			"^#/.+"
		].concat(config.sortImportsInternalPattern)
	}];
}

//#endregion
//#region src/defineESLintConfig/configs/defineCustomPerfectionistConfig.ts
function defineCustomPerfectionistConfig(config) {
	return {
		files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
		languageOptions: { globals: {
			...globals.browser,
			...globals.node
		} },
		rules: {
			"@typescript-eslint/no-unused-vars": [2, {
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_"
			}],
			"import-x/no-unresolved": defineImportXNoUnresolvedRule(config),
			"no-empty": [2, { allowEmptyCatch: true }],
			"perfectionist/sort-exports": [2, {
				groups: ["value-export", "type-export"],
				newlinesBetween: 1
			}],
			"perfectionist/sort-imports": definePerfectionistSortImportsRule(config),
			"unicorn/consistent-function-scoping": [2, { checkArrowFunctions: false }],
			"unicorn/no-useless-undefined": [2, { checkArguments: false }],
			...config.rules
		},
		settings: {
			"import/resolver-next": [createTypeScriptImportResolver({
				alwaysTryTypes: true,
				project: tsconfigPath
			})],
			react: { version: "detect" }
		}
	};
}

//#endregion
//#region src/defineESLintConfig/configs/defineDisableRulesConfig.ts
function defineDisableRulesConfig(disableRules) {
	if (!disableRules?.length) return;
	return { rules: Object.fromEntries(disableRules.map((rule) => [rule, 0])) };
}

//#endregion
//#region src/defineESLintConfig/configs/defineEnableRulesConfig.ts
function defineEnableRulesConfig(enableRules) {
	if (!enableRules?.length) return;
	return { rules: Object.fromEntries(enableRules.map((rule) => [rule, 2])) };
}

//#endregion
//#region src/defineESLintConfig/configs/defineESXConfig.ts
function defineESXConfig(esTarget) {
	if (!esTarget || esTarget === "esnext") return;
	const target = esTarget === "es6" ? "es2015" : esTarget;
	return esX.configs[`flat/restrict-to-${target}`];
}

//#endregion
//#region src/defineESLintConfig/configs/defineGlobalIgnoresConfig.ts
function defineGlobalIgnoresConfig(globalIgnoresArgs) {
	if (!globalIgnoresArgs?.length) return;
	return globalIgnores(globalIgnoresArgs);
}

//#endregion
//#region src/defineESLintConfig/configs/defineIgnoreFileConfig.ts
function defineIgnoreFileConfig(IgnoreFile) {
	if (!IgnoreFile) return;
	return includeIgnoreFile(IgnoreFile);
}

//#endregion
//#region src/defineESLintConfig/index.ts
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
function defineESLintConfig(config) {
	const realConfig = {
		configs: config?.configs ?? [],
		disableRules: config?.disableRules ?? [],
		enableRules: config?.enableRules ?? [],
		esTarget: config?.esTarget ?? "esnext",
		globalIgnores: config?.globalIgnores ?? [],
		noUnresolvedIgnore: config?.noUnresolvedIgnore ?? [],
		rules: config?.rules ?? {},
		sortImportsGroups: config?.sortImportsGroups ?? [],
		sortImportsInternalPattern: config?.sortImportsInternalPattern ?? []
	};
	return defineConfig([
		flatConfigs.recommended,
		flatConfigs.typescript,
		jslint.configs.recommended,
		perfectionist.configs["recommended-natural"],
		react.configs.flat.recommended,
		react.configs.flat["jsx-runtime"],
		configs.flat["recommended-latest"],
		reactRefresh.configs.recommended,
		stylistic.configs.recommended,
		configs$1.recommended,
		unicorn.configs.recommended,
		defineCustomPerfectionistConfig(realConfig),
		defineESXConfig(realConfig.esTarget),
		...realConfig.configs,
		defineEnableRulesConfig(defaultEnableRules),
		defineDisableRulesConfig(defaultDisableRules),
		defineEnableRulesConfig(realConfig.enableRules),
		defineDisableRulesConfig(realConfig.disableRules),
		defineGlobalIgnoresConfig(realConfig.globalIgnores),
		defineIgnoreFileConfig(gitignorePath),
		prettierRecommended,
		prettierConfig
	].filter(Boolean));
}

//#endregion
//#region src/definePrettierConfig/index.ts
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
function definePrettierConfig(options) {
	const overrides = [];
	const plugins = options?.plugins ?? [];
	if (options?.overrides) for (const [key, value] of Object.entries(options.overrides)) overrides.push({
		files: key,
		options: value
	});
	return {
		semi: false,
		singleQuote: true,
		trailingComma: "none",
		...options,
		overrides,
		plugins: [
			"prettier-plugin-packagejson",
			"prettier-plugin-tailwindcss",
			...plugins
		]
	};
}

//#endregion
export { defineESLintConfig, definePrettierConfig };