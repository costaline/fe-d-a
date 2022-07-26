export const getRouteValues = (filePath: string) => {
	const [_, relativePath, ext] =
		filePath.match(/\.\/(.+)\.(js|jsx|tsx)$/i) || []

	const preparedPath = relativePath
		.replace(/index$/g, '')
		.replace(/\[\.{3}.+\]/, '*')
		.replace(/\[([a-z0-9-_]+)?\]/g, `:$1`)

	return {
		routePath: `/${preparedPath}`,
		filePath: `${relativePath}.${ext}`,
	}
}
