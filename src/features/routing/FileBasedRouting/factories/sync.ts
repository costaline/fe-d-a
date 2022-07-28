import { createSyncRoutes } from '../components/SyncRoutes'
import { createConfig } from '../helpers'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const factory = (ctx: __WebpackModuleApi.RequireContext) => {
	const { routes, is404 } = createConfig(ctx, { isLazy: false })

	const FileBasedRouting = createSyncRoutes(routes, is404)

	return { routes, FileBasedRouting }
}
