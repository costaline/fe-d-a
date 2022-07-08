const { getLoader, loaderByName } = require('@craco/craco')

const addScopedCssLoader = targetRule => {
	const rules = targetRule.use || targetRule.loader

	let cssLoaderIndex = -1
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i]
		if (rule.loader && rule.loader.includes('css-loader')) {
			cssLoaderIndex = i
			break
		}
	}

	if (cssLoaderIndex !== -1) {
		const scopedCssRule = { loader: require.resolve('scoped-css-loader') }
		rules.splice(cssLoaderIndex + 1, 0, scopedCssRule)
	} else {
		return console.log('no css-loader found')
	}
}

class RuleUpdater {
	constructor(oneOfRule, env) {
		this.oneOfRule = oneOfRule
		this.env = env
	}

	_printMessage = (key) => {
		console.log(
			`Can't find the webpack rule to match "${key}" files in the ${this.env} webpack config!`,
		)
	}

	_addLoader = (key) => {
		const rule = this.oneOfRule.oneOf.find(
			rule =>
				rule.test &&
				rule.test.toString().includes(key) &&
				rule.test.toString().indexOf('.module') === -1,
		)

		if (!rule) {
			this._printMessage(key)
		} else {
			addScopedCssLoader(rule)
		}
	}

	update(key) {
		this._addLoader(key)
		return this
	}
}

export const overrideWebpackConfig = ({
																				webpackConfig,
																				cracoConfig,
																				pluginOptions = {},
																				context: { env, paths },
																			}) => {
	let { include: includeRegExp } = pluginOptions

	if (!includeRegExp) {
		includeRegExp = /\.scoped\.(css|scss|sass|styl|stylus)$/
	}

	// add babel-plugin-react-scoped-css
	const {
		isFound,
		match,
	} = getLoader(webpackConfig, loaderByName('babel-loader'))
	if (isFound) {
		match.loader.options.plugins.push([
			require.resolve('babel-plugin-react-scoped-css'),
			{
				include: includeRegExp,
			},
		])
	} else {
		return console.log('no babel loader found')
	}

	// add scoped-css-loader
	const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf)
	if (!oneOfRule) {
		return console.log(
			'Can\'t find a \'oneOf\' rule under module.rules in the ' + `${env} webpack config!`,
			'webpack+rules+oneOf',
		)
	}

	new RuleUpdater(oneOfRule, env)
		.update('.css$')
		.update('scss|sass')
		.update('styl|stylus')

	return webpackConfig

}
