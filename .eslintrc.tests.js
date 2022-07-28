module.exports = {
	extends: [
		'plugin:jest/all',
		'plugin:testing-library/react',
		'plugin:cypress/recommended',
	],

	rules: {
		'jest/no-hooks': 'off',
		'jest/prefer-expect-assertions': [
			'warn',
			{ onlyFunctionsWithAsyncKeyword: true },
		],
		'jest/prefer-lowercase-title': 'warn',
		'jest/require-to-throw-message': 'off',
	},
}
