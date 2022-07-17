import { createApi } from '@reduxjs/toolkit/query/react'

import {
	GetArticleQuery,
	GetArticleQueryVariables,
	GetArticlesQuery,
	GetArticlesQueryVariables,
} from '@@/generated/graphql.types'
import { GET_ARTICLES_QUERY } from '@@/store/articles/GetArticle.query.gql'
import { baseGraphqlQuery } from '@@/store/baseApi'
import GET_ARTICLE_QUERY from './GetArticle.query.graphql'

export const articlesApi = createApi({
	reducerPath: 'articles/api',
	baseQuery: baseGraphqlQuery,
	endpoints: (builder) => ({
		getArticles: builder.query<GetArticlesQuery, GetArticlesQueryVariables>({
			query: () => ({
				document: GET_ARTICLES_QUERY,
			}),
		}),

		getArticle: builder.query<GetArticleQuery, GetArticleQueryVariables>({
			query: ({ id }) => ({
				document: GET_ARTICLE_QUERY,
				variables: {
					id,
				},
			}),
		}),
	}),
})

export const { useGetArticleQuery, useGetArticlesQuery } = articlesApi
