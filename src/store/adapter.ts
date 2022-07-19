/* TODO: refactor in OOP style */
import { DocumentNode } from 'graphql'
import { gql } from 'graphql-request'

type Adapter = {
	/* common */
	getTokensFromRefreshData: (data: unknown) => {
		token: string
		refreshToken: string
	}
	/* rest */
	restUrl: string
	getRestBody: (refreshToken: string) => string
	/* graphql */
	gqlDocument: string | DocumentNode
	getGqlVariables: (refreshToken: string) => Record<string, string>
}

// strapi hasn't correct refresh token ability
export const strapiAdapter: Adapter = {
	/* common */
	getTokensFromRefreshData: (
		data: unknown
	): { token: string; refreshToken: string } => {
		const { jwt } = data as { jwt: string }

		return {
			token: jwt,
			refreshToken: '',
		}
	},
	/* rest */
	restUrl: 'auth/refreshToken',
	getRestBody: (refreshToken) =>
		JSON.stringify({
			token: refreshToken,
		}),
	/* graphql */
	// strapi hasn't refreshToken query
	gqlDocument: gql`
		#		query RefreshToken($token: String) {
		#			refreshToken(token: $token) {
		#				token
		#			}
		#		}
	`,
	getGqlVariables: (refreshToken) => ({ token: refreshToken }),
}
