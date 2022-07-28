module.exports = {
	parserOptions: {
		project: ['./tsconfig.json'],
	},

	rules: {
		'@typescript-eslint/array-type': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-misused-promises': [
			'warn',
			{
				checksVoidReturn: false,
			},
		],
		'@typescript-eslint/no-restricted-imports': [
			'warn',
			{
				name: 'react-redux',
				importNames: ['useSelector', 'useDispatch'],
				message:
					'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
			},
		],
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/no-shadow': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_$',
				argsIgnorePattern: '^_$',
			},
		],
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/prefer-ts-expect-error': 'warn',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/strict-boolean-expressions': [
			'warn',
			{
				allowNullableString: true,
				allowNullableBoolean: true,
				allowNullableNumber: true,
			},
		],
	},
}
