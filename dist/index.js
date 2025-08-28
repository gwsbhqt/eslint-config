import jslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import { flatConfigs } from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { config, configs } from "typescript-eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { findUpSync } from "find-up";
import { includeIgnoreFile } from "@eslint/compat";
import esX from "eslint-plugin-es-x";

//#region src/createESLintConfig/constants.ts
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = findUpSync(".gitignore", { cwd: __dirname });
const tsconfigPath = findUpSync("tsconfig.json", { cwd: __dirname });

//#endregion
//#region src/createESLintConfig/rules/createImportXNoUnresolved.ts
function createImportXNoUnresolved(config$1) {
	const defaultIgnore = [
		"^(~|@|#)\\w+/",
		"^(bun|node|deno):",
		"\\.(svg|json)$"
	];
	const ignore = defaultIgnore.concat(config$1.noUnresolvedIgnore);
	return [2, { ignore }];
}

//#endregion
//#region src/createESLintConfig/rules/createPerfectionistSortImports.ts
function createPerfectionistSortImports(config$1) {
	const defaultGroups = [
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
	];
	const defaultInternalPattern = [
		"^~/.+",
		"^@/.+",
		"^#/.+"
	];
	const groups = config$1.sortImportsGroups.length ? config$1.sortImportsGroups : defaultGroups;
	const internalPattern = defaultInternalPattern.concat(config$1.sortImportsInternalPattern);
	return [2, {
		groups,
		internalPattern
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
	const defaultFiles = ["**/typings", "**/dist"];
	const disableFiles = defaultFiles.concat(config$1.disableFiles);
	const flatConfig = gitignorePath ? includeIgnoreFile(gitignorePath) : {};
	flatConfig.ignores?.push(...disableFiles);
	return flatConfig;
}

//#endregion
//#region src/createESLintConfig/configs/createDisableRulesConfig.ts
function createDisableRulesConfig(config$1) {
	const defaultDisableRules = [
		"@typescript-eslint/ban-ts-comment",
		"@typescript-eslint/no-empty-object-type",
		"@typescript-eslint/no-explicit-any",
		"@typescript-eslint/no-namespace",
		"@typescript-eslint/no-unsafe-function-type",
		"import-x/no-named-as-default-member",
		"react-refresh/only-export-components",
		"react/prop-types"
	];
	const disableRules = defaultDisableRules.concat(config$1.disableRules);
	return { rules: Object.fromEntries(disableRules.map((rule) => [rule, 0])) };
}

//#endregion
//#region src/createESLintConfig/configs/createEnableRulesConfig.ts
function createEnableRulesConfig(config$1) {
	const defaultEnableRules = [
		"@typescript-eslint/consistent-type-imports",
		"import-x/consistent-type-specifier-style",
		"no-useless-rename",
		"object-shorthand",
		"react/self-closing-comp"
	];
	const enableRules = defaultEnableRules.concat(config$1.enableRules);
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
	return config(flatConfigs.recommended, flatConfigs.typescript, jslint.configs.recommended, perfectionist.configs["recommended-natural"], react.configs.flat.recommended ?? [], react.configs.flat["jsx-runtime"] ?? [], reactHooks.configs["recommended-latest"], reactRefresh.configs.recommended, configs.recommended, createESXConfig(realConfig), createDisableFilesConfig(realConfig), createDisableRulesConfig(realConfig), createEnableRulesConfig(realConfig), createCustomPerfectionistConfig(realConfig), ...realConfig.configs, prettierRecommended, prettierConfig);
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
	if (options?.overrides) Object.entries(options.overrides).forEach(([key, value]) => {
		overrides.push({
			files: key,
			options: value
		});
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