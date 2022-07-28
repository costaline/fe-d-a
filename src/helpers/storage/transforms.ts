/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CryptoJS from 'crypto-js'

if (!process.env.REACT_APP_CRYPT_SECRET_KEY) {
	// eslint-disable-next-line no-console
	console.error('REACT_APP_CRYPT_SECRET_KEY should be defined')
}

const crypt = {
	enc(value: string) {
		return CryptoJS.AES.encrypt(
			value,
			process.env.REACT_APP_CRYPT_SECRET_KEY!
		).toString()
	},

	dec(value: string) {
		return CryptoJS.AES.decrypt(
			value,
			process.env.REACT_APP_CRYPT_SECRET_KEY!
		).toString(CryptoJS.enc.Utf8)
	},
}

const code = {
	enc: (value: string) => window.btoa(value),
	dec: (value: string) => window.atob(value),
}

export const transforms = {
	crypt,
	code,
}

export type TransformsType = keyof typeof transforms
