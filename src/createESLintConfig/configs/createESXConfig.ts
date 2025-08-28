import esX from 'eslint-plugin-es-x'

import type { InfiniteDepthConfigWithExtends } from 'typescript-eslint'

export interface CreateESXConfig {
  esTarget: ESTarget
}

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

export function createESXConfig(
  config: CreateESXConfig
): InfiniteDepthConfigWithExtends {
  const target = config.esTarget === 'es6' ? 'es2015' : config.esTarget
  return target === 'esnext' ? [] : esX.configs[`flat/restrict-to-${target}`]
}
