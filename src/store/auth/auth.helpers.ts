import { CookieStorage, createStorage, LocalStorage } from '@@/helpers/storage'

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
	save: <D extends { isRemember: boolean }>(data: D): void => {
		persisted[data.isRemember ? 1 : 0].save(data)
	},

	get: <D>(): D | null => {
		const value = persisted.reduce<D>((res, storage) => {
			return {
				...res,
				...(storage.get() || {}),
			}
		}, {} as D)

		return Object.keys(value).length ? value : null
	},

	remove: (): void => {
		persisted.forEach((storage) => storage.remove())
	},
}
