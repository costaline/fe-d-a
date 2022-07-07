module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],

	plugins: ['import', 'react', '@typescript-eslint', 'simple-import-sort'],

	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},

	rules: {
		'arrow-body-style': 'off',
		'default-param-last': 'warn',
		'dot-notation': 'off',
		'global-require': 'off',
		'lines-between-class-members': ['warn', 'always'],
		'no-console': 'warn',
		'no-param-reassign': [
			'warn',
			{ props: true, ignorePropertyModificationsForRegex: ['^draft'] },
		],
		'no-restricted-exports': 'off',
		'no-underscore-dangle': [
			'warn',
			{
				allowAfterThis: true,
				allowAfterSuper: true,
			},
		],
		'no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_$',
				argsIgnorePattern: '^_$',
			},
		],
		'no-use-before-define': 'off',
		'object-curly-newline': 'off',
		'object-curly-spacing': ['warn', 'always'],
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
		'spaced-comment': 'warn',

		'import/export': 'off',
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
		'import/no-cycle': 'off',
		'import/no-unresolved': 'error',
		'import/order': 'warn',
		'import/prefer-default-export': 'off',

		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-noninteractive-element-interactions': 'warn',

		'prettier/prettier': 'warn',

		'react/destructuring-assignment': [
			'warn',
			'always',
			{
				ignoreClassFields: true,
			},
		],
		'react/forbid-prop-types': ['warn', { forbid: ['any', 'array'] }],
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
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',
		'react/no-unused-prop-types': 'warn',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
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
			files: ['**/*.js', '**/*.jsx'],

			extends: ['./.eslintrc.js.js'],
		},
		{
			files: ['**/*.ts', '**/*.tsx'],

			extends: ['./.eslintrc.ts.js'],
		},
	],
}
