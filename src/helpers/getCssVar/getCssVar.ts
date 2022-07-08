/* eslint-disable no-console */

export const getCssVar = (
	name: string,
	fallback = '',
	element = document.documentElement
) => {
	if (!name) throw new Error('Empty variable name')
	if (typeof name !== 'string') throw new Error('Invalid variable type')
	if (!name?.startsWith('--')) throw new Error('Invalid variable name')

	const result = getComputedStyle(element).getPropertyValue(name)

	if (!result && !fallback) {
		console.warn(`Variable "${name}" not found`)

		return ''
	}

	if (fallback) {
		console.warn(`Use fallback value "${fallback}"`)

		return fallback
	}

	return result
}
