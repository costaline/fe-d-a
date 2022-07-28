module.exports = {
	rules: {
		'no-shadow': 'warn',
		'no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_$',
				argsIgnorePattern: '^_$',
			},
		],

		'react/forbid-prop-types': ['warn', { forbid: ['any', 'array'] }],
		'react/no-unused-prop-types': 'warn',
		'react/prop-types': 'warn',
		'react/require-default-props': 'off',
	},
}
