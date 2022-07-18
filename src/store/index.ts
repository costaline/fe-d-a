import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { aboutApi } from '@@/store/about/about.api'
import { articlesApi } from '@@/store/articles/articles.api'
import { cartSlice } from '@@/store/cart/cart.slice'
import { productsApi } from '@@/store/products/products.api'
import { uiSlice } from '@@/store/ui/ui.slice'

const combinedReducer = combineReducers({
	[productsApi.reducerPath]: productsApi.reducer,
	[aboutApi.reducerPath]: aboutApi.reducer,
	[articlesApi.reducerPath]: articlesApi.reducer,

	[uiSlice.name]: uiSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
})

export const RESET_STATE = '!!!RESET_STATE!!!'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const rootReducer = (state, action) => {
	if (action.type === RESET_STATE) {
		// eslint-disable-next-line no-param-reassign
		state = undefined
	}

	return combinedReducer(state, action)
}

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['ui'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			productsApi.middleware,
			aboutApi.middleware,
			articlesApi.middleware
		)
	},
})

export const persistor = persistStore(store)

// export type RootState = ReturnType<typeof store.getState>
export type RootState = Omit<ReturnType<typeof store.getState>, '_persist'>
export type AppDispatch = typeof store.dispatch
