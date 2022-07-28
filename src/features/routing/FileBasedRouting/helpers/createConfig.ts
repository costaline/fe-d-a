import { constantCase } from 'change-case'

import { Config, LazyRouteParams, Options, SyncRouteParams } from '../types'
import { getRouteValues } from './getRouteValues'
import { lazyWithPreload } from './lazyWithPreload'
import { templatePath } from './templatePath'

/* eslint-disable prettier/prettier */
export function createConfig (ctx: __WebpackModuleApi.RequireContext, options?: Options<true>): Config<LazyRouteParams>
export function createConfig ( ctx: __WebpackModuleApi.RequireContext, options?: Options<false>): Config<SyncRouteParams>
export function createConfig ( ctx: __WebpackModuleApi.RequireContext, { pagesDir = 'pages', isLazy = true }: Options = {}): Config {
	/* eslint-enable prettier/prettier */
	let is404 = false

	const routes = ctx.keys().reduce((acc, path) => {
		const { routePath, filePath } = getRouteValues(path)

		let name = constantCase(routePath)

		if (routePath === '/') {
			name = 'HOME'
		}

		if (routePath === '/404') {
			is404 = true
			name = 'NOT_FOUND'
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
			[name]: {
				routePath,
				filePath,
				templatePath,
				...additional,
			},
		}
	}, {})

	return { is404, routes }
}
