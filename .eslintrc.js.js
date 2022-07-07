module.exports = {
	rules: {
		'react/prop-types': 'warn',

		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
		'@typescript-eslint/no-var-requires': 'off',
	},
}
