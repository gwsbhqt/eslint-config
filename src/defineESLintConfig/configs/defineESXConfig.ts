import esX from 'eslint-plugin-es-x'

import type { ConfigWithFalsy } from '../types'

export function defineESXConfig(esTarget?: esX.ESTarget): ConfigWithFalsy {
  if (!esTarget || esTarget === 'esnext') return
  const target = esTarget === 'es6' ? 'es2015' : esTarget
  return esX.configs[`flat/restrict-to-${target}`]
}
