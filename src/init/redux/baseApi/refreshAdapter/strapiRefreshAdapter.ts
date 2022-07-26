import { gql } from 'graphql-request'

import { RefreshAdapterType } from './refreshAdapter.types'

export const strapiRefreshAdapter: RefreshAdapterType<'graphql' | 'rest'> = {
	getTokensFromData: (
		data: unknown
	): { token: string; refreshToken: string } => {
		const { jwt } = data as { jwt: string }

		return {
			token: jwt,
			refreshToken: '',
		}
	},

	rest: {
		url: 'auth/refreshToken',
		getBody: (refreshToken) =>
			JSON.stringify({
				token: refreshToken,
			}),
	},

	// strapi hasn't refreshToken query
	graphql: {
		document: gql`
			#		query RefreshToken($token: String) {
			#			refreshToken(token: $token) {
			#				token
			#			}
			#		}
		`,
		getVariables: (refreshToken) => ({ token: refreshToken }),
	},
}
