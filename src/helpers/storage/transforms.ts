import CryptoJS from 'crypto-js'

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
