import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { aboutApi } from './about/about.api'
import { articlesApi } from './articles/articles.api'
import { authApi } from './auth/auth.api'
import { authSlice } from './auth/auth.slice'
import { cartSlice } from './cart/cart.slice'
import { productsApi } from './products/products.api'
import { uiSlice } from './ui/ui.slice'

/**
 *
 */
export const apiMiddlewares = [
	authApi.middleware,
	productsApi.middleware,
	aboutApi.middleware,
	articlesApi.middleware,
]

/**
 *
 */
const combinedReducer = combineReducers({
	/* api */
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[aboutApi.reducerPath]: aboutApi.reducer,
	[articlesApi.reducerPath]: articlesApi.reducer,
	/* slices */
	[authSlice.name]: authSlice.reducer,
	[uiSlice.name]: uiSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
})

/**
 *
 */
export const RESET_STATE = '!!!RESET_STATE!!!'

export const resetStateAction = () => ({
	type: RESET_STATE,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const rootReducer = (state, action) => {
	if (action.type === RESET_STATE) {
		// eslint-disable-next-line no-param-reassign
		state = undefined
	}

	return combinedReducer(state, action)
}

/**
 *
 */

export const rootPersistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['ui'],
}

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
