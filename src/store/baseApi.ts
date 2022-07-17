import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

export const baseGraphqlQuery = graphqlRequestBaseQuery({
	url: `${process.env.REACT_APP_STRAPI_BASE_URL}/graphql`,
})

export const baseRestQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_STRAPI_BASE_URL}/api`,
})
