import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { RouteParams, RoutesConfig } from '../types'

interface Props<R> {
	routes: R
	is404: boolean
}

export const BaseRoutes = <T extends RoutesConfig<RouteParams>>({
	routes,
	is404,
}: Props<T>): JSX.Element => {
	const { pathname } = useLocation()

	return (
		<Routes>
			{Object.values(routes).map(({ routePath, Component }) => (
				<Route key={routePath} element={<Component />} path={routePath} />
			))}

			{is404 && (
				<Route
					element={<Navigate replace to={`/404?from=${pathname}`} />}
					path="*"
				/>
			)}
		</Routes>
	)
}
