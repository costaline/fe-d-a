import { DocumentNode } from 'graphql'

interface RestProperties {
	url: string
	getBody: (refreshToken: string) => string
}

interface GraphqlProperties {
	document: string | DocumentNode
	getVariables: (refreshToken: string) => Record<string, string>
}

interface RefreshAdapterCommon {
	getTokensFromData: (data: unknown) => {
		token: string
		refreshToken: string
	}

	rest?: RestProperties
	graphql?: GraphqlProperties
}

type RefreshApiType = Exclude<keyof RefreshAdapterCommon, 'getTokensFromData'>

export type RefreshAdapterType<T extends RefreshApiType> = Required<
	Pick<RefreshAdapterCommon, 'getTokensFromData' | T>
>
