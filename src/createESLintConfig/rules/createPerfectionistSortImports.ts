import type { Linter } from 'eslint'

export interface CreatePerfectionistSortImports {
  sortImportsGroups: string[] | string[][]
  sortImportsInternalPattern: string[]
}

export function createPerfectionistSortImports(
  config: CreatePerfectionistSortImports
): Linter.RuleEntry {
  const defaultGroups = [
    ['side-effect', 'side-effect-style'],
    'style',
    'builtin',
    'external',
    ['internal', 'subpath'],
    ['parent', 'sibling', 'index'],
    'unknown',
    'import',
    'type'
  ]
  const defaultInternalPattern = ['^~/.+', '^@/.+', '^#/.+']
  const groups = config.sortImportsGroups.length
    ? config.sortImportsGroups
    : defaultGroups
  const internalPattern = defaultInternalPattern.concat(
    config.sortImportsInternalPattern
  )
  return [2, { groups, internalPattern }]
}
