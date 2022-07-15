import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'

export const aboutApi = createApi({
	reducerPath: 'about/api',
	baseQuery: graphqlRequestBaseQuery({
		url: 'http://127.0.0.1:1337/graphql',
	}),
	endpoints: (builder) => ({
		getAbout: builder.query<any, void>({
			query: () => ({
				document: gql`
					query getAbout {
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
