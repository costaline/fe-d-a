export const stringify = (data: any): string => {
	if (typeof data === 'string') return data

	return JSON.stringify(data)
}

export const parse = <P>(data: string): P | null => {
	try {
		return JSON.parse(data)
	} catch {
		return null
	}
}
