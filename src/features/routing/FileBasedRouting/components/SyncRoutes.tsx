import type { SyncRoutesConfig } from '../types'
import { BaseRoutes } from './BaseRoutes'

export const createSyncRoutes = (routes: SyncRoutesConfig, is404: boolean) => {
	return function SyncRoutes(): JSX.Element {
		return <BaseRoutes<SyncRoutesConfig> is404={is404} routes={routes} />
	}
}
