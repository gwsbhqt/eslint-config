# @gwsbhqt/eslint-config

[简体中文](./README-zh.md)

A flexible and powerful factory for creating ESLint and Prettier configurations.

[![npm version](https://img.shields.io/npm/v/@gwsbhqt/eslint-config.svg)](https://www.npmjs.com/package/@gwsbhqt/eslint-config)
[![License](https://img.shields.io/npm/l/@gwsbhqt/eslint-config.svg)](./LICENSE)

## Features

- **Flat Config**: Utilizes ESLint's latest [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) format.
- **Comprehensive Defaults**: Integrates popular plugins for TypeScript, React, React Hooks, Import-x, and Perfectionist out-of-the-box.
- **Highly Customizable**: Easily extend, override, or disable rules and configurations with a simple and intuitive API.
- **Prettier Integration**: Comes with a Prettier config factory that includes plugins for Tailwind CSS and `package.json` sorting.
- **Automatic Sorting**: Sorts imports, object keys, and more using [Perfectionist](https://github.com/azat-io/perfectionist).
- **TypeScript First**: Built with TypeScript, providing excellent type safety for your configurations.

## Installation

Install the package and its peer dependencies using your favorite package manager.

```bash
npm install -D @gwsbhqt/eslint-config eslint prettier typescript
```

## Basic Usage

### ESLint Configuration

In your `eslint.config.js`:

```javascript
// eslint.config.js
import { defineESLintConfig } from '@gwsbhqt/eslint-config'

// Export the configuration array
export default defineESLintConfig({
  // Basic customizations can go here
  noUnresolvedIgnore: ['^@/'], // Handle '@/*' path aliases
  globalIgnores: ['dist/**'] // Ignore the output directory
})
```

### Prettier Configuration

In your `prettier.config.js`:

```javascript
// prettier.config.js
import { definePrettierConfig } from '@gwsbhqt/eslint-config'

export default definePrettierConfig({
  printWidth: 100,
  semi: true
})
```

---

## API Reference

### `defineESLintConfig(options)`

Defines a complete ESLint flat configuration array. All options are optional.

#### `configs: FlatConfig[]`

Merge additional ESLint flat config objects. This is useful for adding plugins or configurations not included in the base setup.

**Example**: Add the `eslint-plugin-unicorn` plugin.

```javascript
import unicorn from 'eslint-plugin-unicorn'

export default defineESLintConfig({
  configs: [
    unicorn.configs['flat/recommended'],
    {
      rules: {
        'unicorn/prevent-abbreviations': 'off'
      }
    }
  ]
})
```

#### `globalIgnores: string[]`

Provide an array of glob patterns for files and directories that ESLint should completely ignore.

**Example**: Ignore all test files and generated files.

```javascript
export default defineESLintConfig({
  globalIgnores: ['**/*.test.ts', '**/*.spec.ts', 'src/generated/**']
})
```

#### `disableRules: string[]`

Provide an array of rule names to disable globally.

**Example**: Disable the `no-console` and `no-debugger` rules.

```javascript
export default defineESLintConfig({
  disableRules: ['no-console', 'no-debugger']
})
```

#### `enableRules: string[]`

Provide an array of rule names to enable. This is useful for activating rules that are not enabled by default in the base configuration.

**Example**: Enforce the use of `===` and `!==` by enabling `eqeqeq`.

```javascript
export default defineESLintConfig({
  enableRules: ['eqeqeq']
})
```

#### `noUnresolvedIgnore: string[]`

An array of patterns passed to the `import-x/no-unresolved` rule. This is essential for making the import resolver aware of path aliases.

**Example**: Ignore aliases starting with `^@/` and `^~_`.

```javascript
export default defineESLintConfig({
  noUnresolvedIgnore: ['^@/', '~/']
})
```

#### `rules: Record<string, any>`

A map of custom rules specifically for `eslint-plugin-perfectionist`. This allows you to fine-tune sorting behavior.

**Example**: Change the sorting order for object keys.

```javascript
export default defineESLintConfig({
  rules: {
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        'partition-by-comment': true
      }
    ]
  }
})
```

#### `sortImportsGroups: string[]`

Define the grouping and order for `perfectionist/sort-imports`.

**Example**: Define custom groups for imports.

```javascript
export default defineESLintConfig({
  sortImportsGroups: [
    'type',
    'react',
    ['builtin', 'external'],
    'internal',
    ['parent', 'sibling', 'index'],
    'side-effect',
    'style',
    'object',
    'unknown'
  ]
})
```

#### `sortImportsInternalPattern: string[]`

Define glob patterns that `perfectionist/sort-imports` should consider as "internal" modules. This should align with your project's path aliases.

**Example**: Treat aliased paths as internal.

```javascript
export default defineESLintConfig({
  sortImportsInternalPattern: ['@/**', '~/**']
})
```

---

### `definePrettierConfig(options)`

Defines a Prettier configuration object. It accepts all standard Prettier options, plus the following enhancements.

#### Standard Prettier Options

You can pass any standard option like `printWidth`, `semi`, `singleQuote`, etc.

**Example**: Customize basic formatting rules.

```javascript
export default definePrettierConfig({
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false
})
```

#### `plugins: string[]`

Provide an array of additional Prettier plugins. `prettier-plugin-packagejson` and `prettier-plugin-tailwindcss` are already included by default.

**Example**: Add a plugin to organize imports (if not handled by ESLint).

```javascript
export default definePrettierConfig({
  plugins: ['prettier-plugin-organize-imports']
})
```

#### `overrides: Record<string, Config>`

Define file-specific overrides. The key is a glob pattern and the value is a Prettier config object.

**Example**: Use a wider print width for JSON files and enable prose wrapping for Markdown.

```javascript
export default definePrettierConfig({
  overrides: {
    '*.json': {
      printWidth: 200
    },
    '*.md': {
      proseWrap: 'always'
    }
  }
})
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
