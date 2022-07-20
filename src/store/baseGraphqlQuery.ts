import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { Mutex } from 'async-mutex'

import { strapiAdapter } from '@@/store/adapter'
import { authActions } from '@@/store/auth/auth.slice'
import { RootState } from '@@/store/index'

const mutex = new Mutex()

export const baseGraphqlPublicQuery = graphqlRequestBaseQuery({
	url: `${process.env.REACT_APP_STRAPI_BASE_URL}/graphql`,
})

export const baseGraphqlPrivateQuery = graphqlRequestBaseQuery({
	url: `${process.env.REACT_APP_STRAPI_BASE_URL}/graphql`,
	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as RootState).auth

		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}

		return headers
	},
})

/* TODO: refactor in OOP style */
const adapter = strapiAdapter

export const baseGraphqlPrivateQueryWithReAuth: typeof baseGraphqlPublicQuery =
	async (args, api, extraOptions) => {
		await mutex.waitForUnlock()

		let result = await baseGraphqlPrivateQuery(args, api, extraOptions)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (result?.error?.status === 401) {
			const { refreshToken } = (api.getState() as RootState).auth

			if (!refreshToken) {
				api.dispatch(authActions.logout())

				await mutex.waitForUnlock()

				return result
			}

			if (!mutex.isLocked()) {
				const release = await mutex.acquire()

				try {
					const refreshResult = await baseGraphqlPublicQuery(
						{
							document: adapter.gqlDocument,
							variables: adapter.getGqlVariables(refreshToken),
						},
						api,
						extraOptions
					)

					if (refreshResult.data) {
						const { user } = (api.getState() as RootState).auth

						api.dispatch(
							authActions.setCredentials({
								user,
								...adapter.getTokensFromRefreshData(refreshResult.data),
							})
						)

						result = await baseGraphqlPrivateQuery(args, api, extraOptions)
					} else {
						api.dispatch(authActions.logout())
					}
				} finally {
					release()
				}
			} else {
				await mutex.waitForUnlock()

				result = await baseGraphqlPrivateQuery(args, api, extraOptions)
			}
		}

		return result
	}
