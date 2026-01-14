declare module 'eslint-plugin-es-x' {
  import type eslintCompat from '@eslint/compat'

  export type ESTarget =
    | 'es3'
    | 'es5'
    | 'es6'
    | 'es2015'
    | 'es2016'
    | 'es2017'
    | 'es2018'
    | 'es2019'
    | 'es2020'
    | 'es2021'
    | 'es2022'
    | 'es2023'
    | 'es2024'
    | 'esnext'

  export const configs: Record<
    `flat/restrict-to-${ESTarget}`,
    eslintCompat.FlatConfig
  >
}
