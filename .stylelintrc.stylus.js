module.exports = {
	extends: [
		'stylelint-stylus/standard',
		'stylelint-config-clean-order',
		// 'stylelint-config-hudochenkov/order',
	],

	rules: {
		'declaration-block-trailing-semicolon': 'never',

		'stylus/declaration-colon': 'always',
		'stylus/indentation': 'tab',
		'stylus/media-feature-colon': 'always',
	},

	overrides: [
		{
			files: ["*.stylus", "**/*.stylus"],

			rules: {
				'declaration-block-trailing-semicolon': 'always',

				'stylus/declaration-colon': 'always',
				'stylus/pythonic': 'never',
				'stylus/semicolon': 'always',
			}
		}
	]
}

