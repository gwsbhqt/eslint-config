import type { Config } from 'prettier'

interface DefinePrettierConfigOptions extends Omit<
  Config,
  'overrides' | 'plugins'
> {
  /**
   * Enable Tailwind CSS related Prettier plugins.
   * @default true
   */
  enableTailwindPlugins?: boolean
  overrides?: Record<string, Config>
  plugins?: Config['plugins']
}

/**
 * Defines a standardized Prettier configuration with sensible defaults and plugin support.
 *
 * @param {DefinePrettierConfigOptions} options - Configuration options for customizing the Prettier setup
 * @returns {Config} A complete Prettier configuration object ready to use
 *
 * @example
 * ```typescript
 * // Basic usage
 * const config = definePrettierConfig()
 *
 * // With custom options and overrides
 * const config = definePrettierConfig({
 *   printWidth: 100,
 *   overrides: {
 *     '*.json': { printWidth: 120 },
 *     '*.md': { proseWrap: 'always' }
 *   },
 *   plugins: ['prettier-plugin-organize-imports']
 * })
 *
 * // Disabling Tailwind CSS related plugins, default is enabled
 * const config = definePrettierConfig({
 *   enableTailwindPlugins: false
 * })
 * ```
 */
export function definePrettierConfig(
  options?: DefinePrettierConfigOptions
): Config {
  const overrides: Config['overrides'] = []
  const optionsPlugins = options?.plugins ?? []
  const plugins: Config['plugins'] = []

  if (options?.overrides) {
    for (const [key, value] of Object.entries(options.overrides)) {
      overrides.push({
        files: key,
        options: value
      })
    }
  }

  plugins.push('prettier-plugin-packagejson')
  if (options?.enableTailwindPlugins ?? true) {
    plugins.push(
      'prettier-plugin-tailwindcss',
      'prettier-plugin-classnames',
      'prettier-plugin-merge'
    )
  }

  return {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    ...options,
    overrides,
    plugins: plugins.concat(optionsPlugins)
  }
}
