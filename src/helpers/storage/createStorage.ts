/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { parse, stringify } from './helpers'
import { transforms as availableTransforms } from './transforms'
import { BaseStorage, Transforms } from './types'

const defaultTransforms: Transforms = {
	keyTransforms: [],
	valueTransforms: [],
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStorage = (Storage: BaseStorage, transforms: Transforms) => {
	const { keyTransforms, valueTransforms } = {
		...defaultTransforms,
		...transforms,
	}

	return (key: string) => {
		const transformedKey = keyTransforms!.reduce(
			(res, t) => availableTransforms[t].enc(res),
			key
		)

		return {
			save(data: any) {
				const stringified = stringify(data)

				const transformedData = valueTransforms!.reduce(
					(res, t) => availableTransforms[t].enc(res),
					stringified
				)

				Storage.saveToStorage(transformedKey, transformedData)
			},

			get<R>(): R | null {
				const transformedData = Storage.getFromStorage(transformedKey)

				const data = valueTransforms!.reduceRight(
					(res, t) => availableTransforms[t].dec(res),
					transformedData
				)

				return parse(data)
			},

			remove() {
				Storage.removeFromStorage(transformedKey)
			},
		}
	}
}
