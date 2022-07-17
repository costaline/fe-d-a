import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'

import {
	GetAboutQuery,
	GetAboutQueryVariables,
} from '@@/generated/graphql.types'
import { baseGraphqlQuery } from '@@/store/baseApi'

export const aboutApi = createApi({
	reducerPath: 'about/api',
	baseQuery: baseGraphqlQuery,
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
