module.exports = {
	rules: {
		'no-shadow': 'off',
		'no-unused-vars': 'off',

		'@typescript-eslint/no-shadow': ['error'],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_$',
				argsIgnorePattern: '^_$',
			},
		],
	},
}
