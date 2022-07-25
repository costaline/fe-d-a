import { TransformsType } from './transforms'

export interface BaseStorage {
	saveToStorage: (key: string, value: string) => void
	getFromStorage: (key: string) => string
	removeFromStorage: (key: string) => void
}

export interface Transforms {
	keyTransforms?: Array<Exclude<TransformsType, 'crypt'>>
	valueTransforms?: Array<TransformsType>
}
