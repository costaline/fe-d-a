import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { Mutex } from 'async-mutex'

import { authActions } from '@@/store/redux/auth/auth.slice'
import { RootState } from '../types'
import { RefreshAdapterType } from './refreshAdapter/refreshAdapter.types'
import { strapiRefreshAdapter } from './refreshAdapter/strapiRefreshAdapter'

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

const refreshAdapter: RefreshAdapterType<'graphql'> = strapiRefreshAdapter

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
							document: refreshAdapter.graphql.document,
							variables: refreshAdapter.graphql.getVariables(refreshToken),
						},
						api,
						extraOptions
					)

					if (refreshResult.data) {
						api.dispatch(
							authActions.updateCredentials(
								refreshAdapter.getTokensFromData(refreshResult.data)
							)
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
