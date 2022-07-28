import { ComponentType, LazyExoticComponent } from 'react'

export type TemplatePath = (
	strings: TemplateStringsArray,
	...keys: Array<string | number>
) => string

export interface RouteParams {
	routePath: string
	filePath: string
	/**
	 * Creates path from routePath & args
	 * @example
	 * // routePath = /articles/:article/authors/:author
	 * ROUTE_NAME.templatePath`${foo}${bar}`
	 * // returns /articles/foo/authors/bar
	 * @example
	 * // there can be a description between the arguments (it will be ignored)
	 * // routePath = /articles/:article/authors/:author
	 * ROUTE_NAME.templatePath`article slug ${foo} username ${bar}`
	 * // returns /articles/foo/authors/bar
	 */
	templatePath: TemplatePath
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

export interface Options<L = boolean> {
	pagesDir?: string
	isLazy?: L
}

export interface Config<R = LazyRouteParams | SyncRouteParams> {
	is404: boolean
	routes: RoutesConfig<R>
}
