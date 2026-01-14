# @gwsbhqt/eslint-config

[English](./README.md)

一个灵活且强大的，用于创建 ESLint 和 Prettier 配置的工厂函数。

[![npm version](https://img.shields.io/npm/v/@gwsbhqt/eslint-config.svg)](https://www.npmjs.com/package/@gwsbhqt/eslint-config)
[![License](https://img.shields.io/npm/l/@gwsbhqt/eslint-config.svg)](./LICENSE)

## 特性

- **Flat Config**: 全面采用 ESLint 最新的 [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) 配置格式。
- **全面的默认配置**: 开箱即用，集成了 TypeScript、React、React Hooks、Import-x 和 Perfectionist 等流行插件。
- **高度可定制**: 通过简单直观的 API 轻松扩展、覆盖或禁用规则与配置。
- **Prettier 集成**: 附带一个 Prettier 配置工厂，内置了 Tailwind CSS 和 `package.json` 排序插件。
- **自动排序**: 使用 [Perfectionist](https://github.com/azat-io/perfectionist) 自动对 imports、对象键等进行排序。
- **TypeScript 优先**: 使用 TypeScript 构建，为你的配置提供卓越的类型安全。

## 安装

使用你喜欢的包管理器安装此包及其对等依赖项。

```bash
npm install -D @gwsbhqt/eslint-config eslint prettier typescript
```

## 基本用法

### ESLint 配置

在你的 `eslint.config.js` 文件中：

```javascript
// eslint.config.js
import { defineESLintConfig } from '@gwsbhqt/eslint-config'

// 导出配置数组
export default defineESLintConfig({
  // 在此进行基本自定义
  noUnresolvedIgnore: ['^@/'], // 处理 '@/*' 路径别名
  globalIgnores: ['dist/**'] // 忽略输出目录
})
```

### Prettier 配置

在你的 `prettier.config.js` 文件中：

```javascript
// prettier.config.js
import { definePrettierConfig } from '@gwsbhqt/eslint-config'

export default definePrettierConfig({
  printWidth: 100,
  semi: true
})
```

---

## API 参考

### `defineESLintConfig(options)`

创建一个完整的 ESLint flat 配置数组。所有选项均为可选。

#### `configs: FlatConfig[]`

合并额外的 ESLint flat 配置对象。这对于添加基础设置中未包含的插件或配置非常有用。

**示例**: 添加 `eslint-plugin-unicorn` 插件。

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

提供一个 glob 模式数组，让 ESLint 完全忽略指定的文件和目录。

**示例**: 忽略所有测试文件和生成的文件。

```javascript
export default defineESLintConfig({
  globalIgnores: ['**/*.test.ts', '**/*.spec.ts', 'src/generated/**']
})
```

#### `disableRules: string[]`

提供一个规则名称数组，以全局禁用这些规则。

**示例**: 禁用 `no-console` 和 `no-debugger` 规则。

```javascript
export default defineESLintConfig({
  disableRules: ['no-console', 'no-debugger']
})
```

#### `enableRules: string[]`

提供一个规则名称数组以启用某些规则。这对于激活基础配置中默认未启用的规则很有用。

**示例**: 通过启用 `eqeqeq` 强制使用 `===` 和 `!==`。

```javascript
export default defineESLintConfig({
  enableRules: ['eqeqeq']
})
```

#### `noUnresolvedIgnore: string[]`

一个模式数组，传递给 `import-x/no-unresolved` 规则。这对于让 import 解析器识别路径别名至关重要。

**示例**: 忽略以 `^@/` 和 `^~_` 开头的别名。

```javascript
export default defineESLintConfig({
  noUnresolvedIgnore: ['^@/', '~/']
})
```

#### `rules: Record<string, any>`

一个专门用于 `eslint-plugin-perfectionist` 的自定义规则 map。它允许你微调排序行为。

**示例**: 更改对象键的排序顺序。

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

为 `perfectionist/sort-imports` 定义分组和排序规则。

**示例**: 为导入创建自定义分组。

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

定义 `perfectionist/sort-imports` 应视为“内部”模块的 glob 模式。这应与你的项目路径别名保持一致。

**示例**: 将别名路径视为内部模块。

```javascript
export default defineESLintConfig({
  sortImportsInternalPattern: ['@/**', '~/**']
})
```

---

### `definePrettierConfig(options)`

创建一个 Prettier 配置对象。它接受所有标准的 Prettier 选项，并增加了以下增强功能。

#### 标准 Prettier 选项

你可以传递任何标准选项，如 `printWidth`、`semi`、`singleQuote` 等。

**示例**: 自定义基本格式化规则。

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

提供一个附加的 Prettier 插件数组。`prettier-plugin-packagejson` 和 `prettier-plugin-tailwindcss` 已默认包含。

**示例**: 添加一个插件来组织导入（如果不由 ESLint 处理）。

```javascript
export default definePrettierConfig({
  plugins: ['prettier-plugin-organize-imports']
})
```

#### `overrides: Record<string, Config>`

定义特定于文件的覆盖规则。键是 glob 模式，值是 Prettier 配置对象。

**示例**: 为 JSON 文件使用更宽的打印宽度，并为 Markdown 文件启用自动换行。

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

## 贡献

欢迎任何形式的贡献！请随时开启一个 Issue 或提交 Pull Request。

## 许可证

本项目基于 MIT 许可证授权。
