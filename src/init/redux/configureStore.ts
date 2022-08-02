import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'

import { apiMiddlewares, persistedReducer } from '@@/store/redux'
import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(...apiMiddlewares, listenerMiddleware.middleware)
	},
	devTools: process.env.REACT_APP_REDUX_DEVTOOLS === 'enabled',
})

export const persistor = persistStore(store)
