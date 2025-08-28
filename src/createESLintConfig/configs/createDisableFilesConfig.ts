import { includeIgnoreFile } from '@eslint/compat'

import { gitignorePath } from '../constants'

import type { FlatConfig } from '@eslint/compat'

export interface CreateDisableFilesConfig {
  disableFiles: string[]
}

export function createDisableFilesConfig(
  config: CreateDisableFilesConfig
): FlatConfig {
  const defaultFiles = ['**/typings', '**/dist']
  const disableFiles = defaultFiles.concat(config.disableFiles)
  const flatConfig = gitignorePath ? includeIgnoreFile(gitignorePath) : {}
  flatConfig.ignores?.push(...disableFiles)
  return flatConfig
}
