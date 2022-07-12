module.exports = {
	rules: {
		'no-shadow': 'off',
		'no-unused-vars': 'off',

		'@typescript-eslint/no-restricted-imports': [
			'warn',
			{
				name: 'react-redux',
				importNames: ['useSelector', 'useDispatch'],
				message:
					'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
			},
		],

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
