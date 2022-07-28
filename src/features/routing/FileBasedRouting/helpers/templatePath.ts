import { RouteParams } from '../types'

export function templatePath(
	this: RouteParams,
	strings: TemplateStringsArray,
	...keys: string[]
): string {
	let idx = 0

	const result = this.routePath.replace(/:[\w-]+/g, () => {
		return keys[idx++] || ''
	})

	return result
}
