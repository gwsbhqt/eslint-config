declare module 'eslint-plugin-es-x' {
  export const configs: Record<
    `flat/restrict-to-${import('../configs/createESXConfig').ESTarget}`,
    import('@eslint/compat').FlatConfig
  >
}
