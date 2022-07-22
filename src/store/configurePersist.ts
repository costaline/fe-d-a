import storage from 'redux-persist/lib/storage'

export const rootPersistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['ui'],
}
