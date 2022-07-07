module.exports = {
	defaultSeverity: 'warning',

	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
	],

	rules: {
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['blockless-after-same-name-blockless', 'first-nested'],
				ignoreAtRules: ['else', 'include'],
			},
		],
		'at-rule-no-unknown': null,
		'color-hex-case': 'lower',
		'color-hex-length': 'long',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'indentation': 'tab',
		'rule-empty-line-before': [
			'always',
			{
				except: ['after-single-line-comment', 'first-nested'],
			},
		],
		'selector-class-pattern': null,
		'max-empty-lines': [1, {ignore: ['comments']}]
	},

	overrides: [
		{
			files: ["*.css", "**/*.css"],

			extends: ['./.stylelintrc.css.js']
		},

		{
			files: ['*.scss', '**/*.scss', '*.sass', '**/*.sass'],

			extends: ['./.stylelintrc.sass.js']
		},

		{
			files: ["*.stylus", "*.styl", "**/*.stylus", "**/*.styl"],

			extends: ['./.stylelintrc.stylus.js']
		},

		{
			files: [
				'*.js',
				'**/*.js',
				'*.jsx',
				'**/*.jsx',
				'*.ts',
				'**/*.ts',
				'*.tsx',
				'**/*.tsx',
			],

			extends: ['./.stylelintrc.css-in-js.js']
		}
	]
}

