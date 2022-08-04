import { ReactNode, Suspense, useEffect } from 'react'

import type { LazyRoutesConfig } from '../types'
import { BaseRoutes } from './BaseRoutes'

interface Props {
	fallback?: ReactNode
	preloaded?: boolean | string[]
}

export const createLazyRoutes = (routes: LazyRoutesConfig, is404: boolean) => {
	return function LazyRoutes({
		preloaded,
		fallback = null,
	}: Props): JSX.Element {
		useEffect(() => {
			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (!preloaded) return

			if (typeof preloaded === 'boolean' && preloaded) {
				Object.values(routes).forEach(async ({ preload }) => await preload())

				return
			}

			if (Array.isArray(preloaded) && preloaded.length) {
				Object.values(routes).forEach(({ preload, routePath }) => {
					if (preloaded.some((p) => p === routePath)) {
						void preload()
					}
				})

				return
			}

			// eslint-disable-next-line no-console
			console.warn('Unexpected preloaded value: ', preloaded)
		}, [preloaded])

		return (
			<Suspense fallback={fallback}>
				<BaseRoutes<LazyRoutesConfig> is404={is404} routes={routes} />
			</Suspense>
		)
	}
}
