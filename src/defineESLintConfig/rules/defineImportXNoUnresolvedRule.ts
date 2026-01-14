import type { Rule } from '../types'

export interface DefineImportXNoUnresolvedRule {
  noUnresolvedIgnore: string[]
}

export function defineImportXNoUnresolvedRule(
  config: DefineImportXNoUnresolvedRule
): Rule {
  const defaultIgnore = [
    String.raw`^(~|@|#)\w+/`,
    String.raw`^(bun|node|deno):`,
    String.raw`\.(svg|json)$`
  ]
  const ignore = defaultIgnore.concat(config.noUnresolvedIgnore)
  return [2, { ignore }]
}
