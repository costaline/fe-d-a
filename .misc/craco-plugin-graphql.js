export const overrideWebpackConfig = ({
																				webpackConfig,
																				pluginOptions = {},
																				context: { env, paths },
																			}) => {

	const loaders = webpackConfig
		.module
		?.rules
		?.find((rule) => Array.isArray(rule?.oneOf))
		?.oneOf

	loaders.splice(
		loaders.length - 1,
		0,
		{
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		},
	)

	return webpackConfig
}
