import type { ConfigWithExtendsArray } from '@eslint/config-helpers'
import type { Linter } from 'eslint'

export type ConfigWithFalsy = ConfigWithExtendsArray | Falsy

export type Falsy = 0 | '' | [] | false | never | null | undefined | void | {}

export type InfiniteArray<T> = InfiniteArray<T>[] | T

export type InfiniteConfigWithFalsy = InfiniteArray<ConfigWithFalsy>

export type Rule = Linter.RuleEntry
