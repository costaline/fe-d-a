import { createSyncRoutes } from '../components/SyncRoutes'
import { createConfig } from '../helpers'

export const factory = (ctx: __WebpackModuleApi.RequireContext) => {
	const { routes, is404 } = createConfig(ctx, { isLazy: false })

	const FileBasedRouting = createSyncRoutes(routes, is404)

	return { routes, FileBasedRouting }
}
