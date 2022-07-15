import { configureStore } from '@reduxjs/toolkit'

import { aboutApi } from '@@/store/about/about.api'
import { cartSlice } from '@@/store/cart/cart.slice'
import { productsApi } from '@@/store/products/products.api'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[aboutApi.reducerPath]: aboutApi.reducer,

		[cartSlice.name]: cartSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			productsApi.middleware,
			aboutApi.middleware
		)
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
