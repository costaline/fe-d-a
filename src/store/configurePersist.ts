import { createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

import { AuthState } from '@@/store/auth/auth.types'

export const rootPersistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['ui'],
}

const shouldRememberTransform = createTransform(
	(inboundState, key: keyof AuthState, state: AuthState) => {
		if (state.isRemember) return inboundState

		return state[key]
	}
)

export const authPersistConfig = {
	key: 'auth',
	version: 1,
	storage,
	transforms: [
		shouldRememberTransform,

		encryptTransform({
			secretKey: `${process.env.REACT_APP_REDUX_PERSIST_ENCRYPT_SECRET_KEY}`,
			onError: (error) => {
				// eslint-disable-next-line no-console
				console.log('encryptTransform error', error)
			},
		}),
	],
}
