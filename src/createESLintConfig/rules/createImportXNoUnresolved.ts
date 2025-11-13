import type { Linter } from 'eslint'

export interface CreateImportXNoUnresolved {
  noUnresolvedIgnore: string[]
}

export function createImportXNoUnresolved(
  config: CreateImportXNoUnresolved
): Linter.RuleEntry {
  const defaultIgnore = [
    String.raw`^(~|@|#)\w+/`,
    String.raw`^(bun|node|deno):`,
    String.raw`\.(svg|json)$`
  ]
  const ignore = defaultIgnore.concat(config.noUnresolvedIgnore)
  return [2, { ignore }]
}
