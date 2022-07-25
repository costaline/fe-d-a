import Cookies from 'js-cookie'

import { BaseStorage } from '../types'

export const CookieStorage: BaseStorage = {
	saveToStorage(key: string, value: string): void {
		Cookies.set(key, value)
	},

	getFromStorage(key: string): string {
		return Cookies.get(key) || ''
	},

	removeFromStorage(key): void {
		Cookies.remove(key)
	},
}
