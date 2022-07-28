if (!process.env.REACT_APP_PAGES_DIR) {
	// eslint-disable-next-line no-console
	console.error('REACT_APP_PAGES_DIR should be defined')
}

export const ctx = require.context(
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	`/src/${process.env.REACT_APP_PAGES_DIR}/`,
	true,
	/\.(js|jsx|tsx)$/
)
