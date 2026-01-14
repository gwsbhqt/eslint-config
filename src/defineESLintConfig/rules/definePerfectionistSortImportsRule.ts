import type { Rule } from '../types'

export interface DefinePerfectionistSortImportsRule {
  sortImportsGroups: string[] | string[][]
  sortImportsInternalPattern: string[]
}

export function definePerfectionistSortImportsRule(
  config: DefinePerfectionistSortImportsRule
): Rule {
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
  const groups =
    config.sortImportsGroups.length > 0
      ? config.sortImportsGroups
      : defaultGroups
  const internalPattern = defaultInternalPattern.concat(
    config.sortImportsInternalPattern
  )
  return [2, { groups, internalPattern }]
}
