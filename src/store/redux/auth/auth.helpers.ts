/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CookieStorage, createStorage, LocalStorage } from '@@/helpers/storage'
import { AuthState } from '@@/store/redux/auth/auth.types'

const cs = createStorage(CookieStorage, {
	keyTransforms: ['code'],
	valueTransforms: ['crypt'],
})(process.env.REACT_APP_AUTH_STORAGE_KEY!)

const ls = createStorage(LocalStorage, {
	keyTransforms: ['code'],
	valueTransforms: ['crypt'],
})(process.env.REACT_APP_AUTH_STORAGE_KEY!)

const persisted = [cs, ls]

export const persistUser = {
	save: (data: AuthState): void => {
		persisted[data.isRemember ? 1 : 0].save(data)
	},

	get: (): AuthState | null => {
		const value = persisted.reduce<AuthState | {}>((res, storage) => {
			return {
				...res,
				...(storage.get() || {}),
			}
		}, {})

		return Object.keys(value).length ? (value as AuthState) : null
	},

	remove: (): void => {
		persisted.forEach((storage) => storage.remove())
	},
}
