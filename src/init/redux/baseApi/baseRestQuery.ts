import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { Mutex } from 'async-mutex'

import { authActions } from '@@/store/redux/auth/auth.slice'
import { RootState } from '../types'
import { RefreshAdapterType } from './refreshAdapter/refreshAdapter.types'
import { strapiRefreshAdapter } from './refreshAdapter/strapiRefreshAdapter'

const mutex = new Mutex()

export const baseRestPublicQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_STRAPI_BASE_URL}/api`,
})

export const baseRestPrivateQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_STRAPI_BASE_URL}/api`,

	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as RootState).auth

		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}

		return headers
	},
})

const refreshAdapter: RefreshAdapterType<'rest'> = strapiRefreshAdapter

export const baseRestPrivateQueryWithReAuth: typeof baseRestPublicQuery =
	async (args, api, extraOptions) => {
		await mutex.waitForUnlock()

		let result = await baseRestPrivateQuery(args, api, extraOptions)

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
					const refreshResult = await baseRestPublicQuery(
						{
							url: refreshAdapter.rest.url,
							body: refreshAdapter.rest.getBody(refreshToken),
							method: 'POST',
						},
						api,
						extraOptions
					)

					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
					if (refreshResult) {
						api.dispatch(
							authActions.updateCredentials(
								refreshAdapter.getTokensFromData(refreshResult)
							)
						)

						result = await baseRestPrivateQuery(args, api, extraOptions)
					} else {
						api.dispatch(authActions.logout())
					}
				} finally {
					release()
				}
			} else {
				await mutex.waitForUnlock()

				result = await baseRestPrivateQuery(args, api, extraOptions)
			}
		}

		return result
	}
