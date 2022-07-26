import { ReactNode, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LazyRoutesConfig } from '../types'

interface Props {
	fallback?: ReactNode
	preloaded?: boolean | string[]
}

export const createLazyRoutes = (routes: LazyRoutesConfig, is404: boolean) => {
	return ({ preloaded, fallback = null }: Props): JSX.Element => {
		useEffect(() => {
			if (!preloaded) return

			if (typeof preloaded === 'boolean' && preloaded) {
				Object.values(routes).forEach(({ preload }) => preload())

				return
			}

			if (Array.isArray(preloaded) && preloaded.length) {
				Object.values(routes).forEach(({ preload, routePath }) => {
					if (preloaded.some((p) => p === routePath)) {
						preload()
					}
				})

				return
			}

			// eslint-disable-next-line no-console
			console.warn('Unexpected value')
		}, [preloaded])

		return (
			<Suspense fallback={fallback}>
				<Routes>
					{Object.values(routes).map(({ routePath, Component }) => (
						<Route key={routePath} element={<Component />} path={routePath} />
					))}

					{is404 && <Route element={<Navigate replace to="/404" />} path="*" />}
				</Routes>
			</Suspense>
		)
	}
}
