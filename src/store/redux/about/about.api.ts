import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'

import { baseGraphqlPrivateQueryWithReAuth } from '@@/init/redux/baseApi/baseGraphqlQuery'
import { GetAboutQuery, GetAboutQueryVariables } from './about.api.generated'

export const aboutApi = createApi({
	reducerPath: 'about/api',
	baseQuery: baseGraphqlPrivateQueryWithReAuth,
	endpoints: (builder) => ({
		getAbout: builder.query<GetAboutQuery, GetAboutQueryVariables>({
			query: () => ({
				document: gql`
					query GetAbout {
						about {
							data {
								attributes {
									title
									content
									advanced
								}
							}
						}
					}
				`,
			}),
		}),
	}),
})

export const { useGetAboutQuery } = aboutApi
