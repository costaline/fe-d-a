import { createLazyRoutes } from '../components/LazyRoutes'
import { createConfig } from '../helpers'

export const factory = (
	ctx: __WebpackModuleApi.RequireContext,
	pagesDir?: string
) => {
	const { routes, is404 } = createConfig(ctx, { pagesDir, isLazy: true })

	const FileBasedRouting = createLazyRoutes(routes, is404)

	return { routes, FileBasedRouting }
}
