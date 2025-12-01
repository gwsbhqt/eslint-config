import type { Config } from 'prettier'

interface CreatePrettierConfigOptions extends Omit<
  Config,
  'overrides' | 'plugins'
> {
  overrides?: Record<string, Config>
  plugins?: Config['plugins']
}

/**
 * Creates a standardized Prettier configuration with sensible defaults and plugin support.
 *
 * @param {CreatePrettierConfigOptions} options - Configuration options for customizing the Prettier setup
 * @returns {Config} A complete Prettier configuration object ready to use
 *
 * @example
 * ```typescript
 * // Basic usage
 * const config = createPrettierConfig()
 *
 * // With custom options and overrides
 * const config = createPrettierConfig({
 *   printWidth: 100,
 *   overrides: {
 *     '*.json': { printWidth: 120 },
 *     '*.md': { proseWrap: 'always' }
 *   },
 *   plugins: ['prettier-plugin-organize-imports']
 * })
 * ```
 */
export function createPrettierConfig(
  options?: CreatePrettierConfigOptions
): Config {
  const overrides: Config['overrides'] = []
  const plugins = options?.plugins ?? []

  if (options?.overrides) {
    for (const [key, value] of Object.entries(options.overrides)) {
      overrides.push({
        files: key,
        options: value
      })
    }
  }

  return {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    ...options,
    overrides,
    plugins: [
      'prettier-plugin-packagejson',
      'prettier-plugin-tailwindcss',
      ...plugins
    ]
  }
}
