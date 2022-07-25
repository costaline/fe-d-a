import { BaseStorage } from '../types'

export const LocalStorage: BaseStorage = {
	saveToStorage(key: string, value: string): void {
		localStorage.setItem(key, value)
	},
	getFromStorage(key: string): string {
		return localStorage.getItem(key) || ''
	},
	removeFromStorage(key: string): void {
		localStorage.removeItem(key)
	},
}
