module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
		},

		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},

		'react': {
			version: 'detect',
		},
	},

	extends: [
		'standard-with-typescript',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
	],

	plugins: ['simple-import-sort'],

	rules: {
		'default-param-last': 'warn',
		'dot-notation': 'off',
		'lines-between-class-members': ['warn', 'always'],
		'no-console': 'warn',
		'no-useless-escape': 'off',
		'object-shorthand': ['warn', 'properties'],
		'padded-blocks': ['warn', 'never'],
		'padding-line-between-statements': [
			'warn',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
		],
		'prefer-const': 'warn',
		'spaced-comment': 'warn',

		'import/export': 'warn',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/newline-after-import': 'warn',
		'import/no-unresolved': 'error',

		'prettier/prettier': 'warn',

		'react/button-has-type': 'warn',
		'react/destructuring-assignment': [
			'warn',
			'always',
			{
				ignoreClassFields: true,
			},
		],
		'react/function-component-definition': 'off',
		'react/jsx-curly-brace-presence': ['warn', 'never'],
		'react/jsx-filename-extension': [
			'warn',
			{ extensions: ['js', 'jsx', '.tsx'] },
		],
		'react/jsx-fragments': 'off',
		'react/jsx-key': ['warn', { checkKeyMustBeforeSpread: true }],
		'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-props': [
			'warn',
			{
				callbacksLast: true,
				shorthandFirst: true,
				shorthandLast: false,
				ignoreCase: false,
				noSortAlphabetically: false,
				reservedFirst: true,
			},
		],
		'react/jsx-uses-vars': 'warn',
		'react/self-closing-comp': ['warn', { component: true, html: true }],

		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': [
			'warn',
			{
				groups: [
					[
						// Side effects
						'^\\u0000',
					],
					[
						// React
						'^(react)$',
						// Node.js builtins
						`^(${require('module').builtinModules.join('|')})(/|$)`,
						// Other packages
						'^@?\\w',
					],
					[
						// Alias imports
						'^(@|@@|@@(\\w+-?)*)(/.*(?<!\\.(jpe?g|png|svg|bmp|webp|css|scss|sass))$)',
						// Parent imports
						'^\\.\\.(?!/?$)',
						'^\\.\\./?$',
						// Relative imports
						'^\\./(?=.*!/)(?!/?$)',
						'^\\.(?!/?$)',
						'^\\./?$',
					],
					[
						// Styles
						'\\.scoped\\.(css|scss|sass|styl|stylus)$',
						'\\.(css|scss|sass|styl|stylus)$',
						'\\.module\\.(css|scss|sass|styl|stylus)$',
						'\\.(emcss)$', // emotion css-in-js
						// Images
						'^.+\\.bmp$',
						'^.+\\.jpe?g$',
						'^.+\\.png$',
						'^.+\\.svg$',
						'^.+\\.webp$',
					],
				],
			},
		],
	},

	overrides: [
		{
			files: ['*.js', '*.jsx'],
			extends: ['./.eslintrc.javascript.js'],
		},

		{
			files: ['*.ts', '*.tsx'],
			extends: ['./.eslintrc.typescript.js'],
		},

		{
			files: ['*.test.*', '*.spec.*'],
			extends: ['./.eslintrc.tests.js'],
		},

		{
			files: ['*.stories.*', '*.story.*'],
			extends: ['./.eslintrc.storybook.js'],
		},
	],
}
