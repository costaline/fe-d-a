import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'

import { aboutApi } from '@@/store/about/about.api'
import { articlesApi } from '@@/store/articles/articles.api'
import { authApi } from '@@/store/auth/auth.api'
import { productsApi } from '@@/store/products/products.api'
import { persistedReducer } from './rootReducer'

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			authApi.middleware,
			productsApi.middleware,
			aboutApi.middleware,
			articlesApi.middleware
		)
	},
})
