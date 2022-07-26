import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IProduct } from './products.types'

export const productsApi = createApi({
	reducerPath: 'products/api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_PRODUCTS_BASE_URL,
	}),
	endpoints: (build) => ({
		getProducts: build.query<IProduct[], number>({
			query: (limit = 5) => `products?limit=${limit}`,
		}),
	}),
})

export const { useGetProductsQuery } = productsApi
