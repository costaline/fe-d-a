import { ComponentType, LazyExoticComponent } from 'react'

interface RouteParams {
	routePath: string
	filePath: string
}

export interface LazyRouteParams extends RouteParams {
	Component: LazyExoticComponent<ComponentType>
	preload: () => Promise<{ default: ComponentType }>
}

export interface SyncRouteParams extends RouteParams {
	Component: ComponentType
}

export type RoutesConfig<R> = Record<string, R>

export type LazyRoutesConfig = RoutesConfig<LazyRouteParams>
export type SyncRoutesConfig = RoutesConfig<SyncRouteParams>

export type Options<L = boolean> = {
	pagesDir?: string
	isLazy?: L
}

export type Config<R = LazyRouteParams | SyncRouteParams> = {
	is404: boolean
	routes: RoutesConfig<R>
}
