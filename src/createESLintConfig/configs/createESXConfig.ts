import esX from 'eslint-plugin-es-x'

import type { ESTarget } from 'eslint-plugin-es-x'
import type { InfiniteDepthConfigWithExtends } from 'typescript-eslint'

export interface CreateESXConfig {
  esTarget: ESTarget
}

export function createESXConfig(
  config: CreateESXConfig
): InfiniteDepthConfigWithExtends {
  const target = config.esTarget === 'es6' ? 'es2015' : config.esTarget
  return target === 'esnext' ? [] : esX.configs[`flat/restrict-to-${target}`]
}
