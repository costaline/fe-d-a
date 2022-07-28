import { Config, LazyRouteParams, Options, SyncRouteParams } from '../types'
import { getRouteValues } from './getRouteValues'
import { lazyWithPreload } from './lazyWithPreload'

/* eslint-disable prettier/prettier */
export function createConfig (ctx: __WebpackModuleApi.RequireContext, options?: Options<true>): Config<LazyRouteParams>
export function createConfig ( ctx: __WebpackModuleApi.RequireContext, options?: Options<false>): Config<SyncRouteParams>
export function createConfig ( ctx: __WebpackModuleApi.RequireContext, { pagesDir = 'pages', isLazy = true }: Options = {}): Config {
	/* eslint-enable prettier/prettier */
	let is404 = false

	const routes = ctx.keys().reduce((acc, path) => {
		const { routePath, filePath } = getRouteValues(path)

		if (routePath === '/404') {
			is404 = true
		}

		let additional = {}

		if (isLazy) {
			// eslint-disable-next-line @typescript-eslint/promise-function-async
			additional = lazyWithPreload(() => import(`/src/${pagesDir}/${filePath}`))
		} else {
			const Component = ctx(path)?.default

			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (!Component) {
				// eslint-disable-next-line no-console
				console.log(`Component "${filePath}" not found`)

				return acc
			}

			additional = { Component }
		}

		return {
			...acc,
			[routePath]: {
				routePath,
				filePath,
				...additional,
			},
		}
	}, {})

	return { is404, routes }
}
