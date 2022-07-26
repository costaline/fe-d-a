import { Navigate, Route, Routes } from 'react-router-dom'

import { SyncRoutesConfig } from '../types'

export const createSyncRoutes = (routes: SyncRoutesConfig, is404: boolean) => {
	return (): JSX.Element => {
		return (
			<Routes>
				{Object.values(routes).map(({ routePath, Component }) => (
					<Route key={routePath} element={<Component />} path={routePath} />
				))}

				{is404 && <Route element={<Navigate replace to="/404" />} path="*" />}
			</Routes>
		)
	}
}
