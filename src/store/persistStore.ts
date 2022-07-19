import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './rootReducer'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth', 'ui'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
