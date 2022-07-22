import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const crypt = {
	enc: (str: string): string => {
		return CryptoJS.AES.encrypt(
			str,
			process.env.REACT_APP_AUTH_STORAGE_SECRET_KEY!
		).toString()
	},
	dec: (encrypted: string): string => {
		return CryptoJS.AES.decrypt(
			encrypted,
			process.env.REACT_APP_AUTH_STORAGE_SECRET_KEY!
		).toString(CryptoJS.enc.Utf8)
	},
}

const save = <D extends { isRemember: boolean }>(data: D): void => {
	const key = window.btoa(process.env.REACT_APP_AUTH_STORAGE_KEY!)
	const encryptedValue = crypt.enc(JSON.stringify(data))

	if (data.isRemember) {
		localStorage.setItem(key, encryptedValue)
	} else {
		Cookies.set(key, encryptedValue)
	}
}

const get = <D extends { isRemember: boolean }>(): D | null => {
	const key = window.btoa(process.env.REACT_APP_AUTH_STORAGE_KEY!)

	const persisted = [Cookies.get(key), localStorage.getItem(key)]

	const parsed = persisted.reduce<D>((result, encryptedValue) => {
		return {
			...result,
			...JSON.parse(encryptedValue ? crypt.dec(encryptedValue) : '{}'),
		}
	}, {} as D)

	return Object.keys(parsed).length ? parsed : null
}

const remove = (): void => {
	const key = window.btoa(process.env.REACT_APP_AUTH_STORAGE_KEY!)

	Cookies.remove(key)
	localStorage.removeItem(key)
}

export const persistUser = {
	save,
	get,
	remove,
}
