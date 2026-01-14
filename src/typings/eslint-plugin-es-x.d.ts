declare module 'eslint-plugin-es-x' {
  import type { ESTarget } from '../defineESLintConfig/configs'
  import type eslintCompat from '@eslint/compat'

  export const configs: Record<
    `flat/restrict-to-${ESTarget}`,
    eslintCompat.FlatConfig
  >
}
