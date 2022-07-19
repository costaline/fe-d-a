import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

export const rootPersistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['ui'],
}

export const authPersistConfig = {
	key: 'auth',
	version: 1,
	storage,
	transforms: [
		encryptTransform({
			secretKey: `${process.env.REACT_APP_REDUX_PERSIST_ENCRYPT_SECRET_KEY}`,
			onError: (error) => {
				// eslint-disable-next-line no-console
				console.log('encryptTransform error', error)
			},
		}),
	],
}
