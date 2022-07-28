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

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(...apiMiddlewares)
	},
	devTools: process.env.REACT_APP_REDUX_DEVTOOLS === 'true',
})

export const persistor = persistStore(store)
