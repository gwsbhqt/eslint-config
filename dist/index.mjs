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
import { config, configs as configs$1 } from "typescript-eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import globals from "globals";
import { findUpSync } from "find-up";
import { includeIgnoreFile } from "@eslint/compat";
import esX from "eslint-plugin-es-x";

//#region src/createESLintConfig/constants.ts
const __dirname = import.meta.dirname;
const gitignorePath = findUpSync(".gitignore", { cwd: __dirname });
const tsconfigPath = findUpSync("tsconfig.json", { cwd: __dirname });

//#endregion
//#region src/createESLintConfig/rules/createImportXNoUnresolved.ts
function createImportXNoUnresolved(config$1) {
	return [2, { ignore: [
		String.raw`^(~|@|#)\w+/`,
		String.raw`^(bun|node|deno):`,
		String.raw`\.(svg|json)$`
	].concat(config$1.noUnresolvedIgnore) }];
}

//#endregion
//#region src/createESLintConfig/rules/createPerfectionistSortImports.ts
function createPerfectionistSortImports(config$1) {
	return [2, {
		groups: config$1.sortImportsGroups.length > 0 ? config$1.sortImportsGroups : [
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
		].concat(config$1.sortImportsInternalPattern)
	}];
}

//#endregion
//#region src/createESLintConfig/configs/createCustomPerfectionistConfig.ts
function createCustomPerfectionistConfig(config$1) {
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
			"import-x/no-unresolved": createImportXNoUnresolved(config$1),
			"no-empty": [2, { allowEmptyCatch: true }],
			"perfectionist/sort-exports": [2, {
				groups: ["value-export", "type-export"],
				newlinesBetween: 1
			}],
			"perfectionist/sort-imports": createPerfectionistSortImports(config$1),
			"unicorn/consistent-function-scoping": [2, { checkArrowFunctions: false }],
			...config$1.rules
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
//#region src/createESLintConfig/configs/createDisableFilesConfig.ts
function createDisableFilesConfig(config$1) {
	const disableFiles = ["**/typings", "**/dist"].concat(config$1.disableFiles);
	const flatConfig = gitignorePath ? includeIgnoreFile(gitignorePath) : {};
	flatConfig.ignores?.push(...disableFiles);
	return flatConfig;
}

//#endregion
//#region src/createESLintConfig/configs/createDisableRulesConfig.ts
function createDisableRulesConfig(config$1) {
	const disableRules = [
		"@typescript-eslint/ban-ts-comment",
		"@typescript-eslint/no-empty-object-type",
		"@typescript-eslint/no-explicit-any",
		"@typescript-eslint/no-namespace",
		"@typescript-eslint/no-unsafe-function-type",
		"import-x/no-named-as-default-member",
		"react-refresh/only-export-components",
		"react/prop-types",
		"unicorn/filename-case",
		"unicorn/import-style",
		"unicorn/no-array-callback-reference",
		"unicorn/no-null",
		"unicorn/no-process-exit",
		"unicorn/no-this-assignment",
		"unicorn/prefer-spread",
		"unicorn/prevent-abbreviations"
	].concat(config$1.disableRules);
	return { rules: Object.fromEntries(disableRules.map((rule) => [rule, 0])) };
}

//#endregion
//#region src/createESLintConfig/configs/createEnableRulesConfig.ts
function createEnableRulesConfig(config$1) {
	const enableRules = [
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
	].concat(config$1.enableRules);
	return { rules: Object.fromEntries(enableRules.map((rule) => [rule, 2])) };
}

//#endregion
//#region src/createESLintConfig/configs/createESXConfig.ts
function createESXConfig(config$1) {
	const target = config$1.esTarget === "es6" ? "es2015" : config$1.esTarget;
	return target === "esnext" ? [] : esX.configs[`flat/restrict-to-${target}`];
}

//#endregion
//#region src/createESLintConfig/index.ts
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
function createESLintConfig(config$1) {
	const realConfig = {
		configs: config$1?.configs ?? [],
		disableFiles: config$1?.disableFiles ?? [],
		disableRules: config$1?.disableRules ?? [],
		enableRules: config$1?.enableRules ?? [],
		esTarget: config$1?.esTarget ?? "esnext",
		noUnresolvedIgnore: config$1?.noUnresolvedIgnore ?? [],
		rules: config$1?.rules ?? {},
		sortImportsGroups: config$1?.sortImportsGroups ?? [],
		sortImportsInternalPattern: config$1?.sortImportsInternalPattern ?? []
	};
	return config(flatConfigs.recommended, flatConfigs.typescript, jslint.configs.recommended, perfectionist.configs["recommended-natural"], react.configs.flat.recommended ?? [], react.configs.flat["jsx-runtime"] ?? [], configs.flat["recommended-latest"], reactRefresh.configs.recommended, stylistic.configs.recommended, configs$1.recommended, unicorn.configs.recommended, createESXConfig(realConfig), createDisableFilesConfig(realConfig), createDisableRulesConfig(realConfig), createEnableRulesConfig(realConfig), createCustomPerfectionistConfig(realConfig), ...realConfig.configs, prettierRecommended, prettierConfig);
}

//#endregion
//#region src/createPrettierConfig/index.ts
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
function createPrettierConfig(options) {
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
export { createESLintConfig, createPrettierConfig };