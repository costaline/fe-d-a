export const ctx = require.context(
	`/src/${process.env.REACT_APP_PAGES_DIR}/`,
	true,
	/\.(js|jsx|tsx)$/,
	'lazy'
)
