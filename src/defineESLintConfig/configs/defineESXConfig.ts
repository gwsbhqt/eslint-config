import esX from 'eslint-plugin-es-x'

import type { ConfigWithFalsy } from '../types'

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

export function defineESXConfig(esTarget?: ESTarget): ConfigWithFalsy {
  if (!esTarget || esTarget === 'esnext') return
  const target = esTarget === 'es6' ? 'es2015' : esTarget
  return esX.configs[`flat/restrict-to-${target}`]
}
