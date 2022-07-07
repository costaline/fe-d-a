const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const stylusRegex = /\.(styl|stylus)$/;
const stylusModuleRegex = /\.module\.(styl|stylus)$/;

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

export const overrideWebpackConfig = ({
																				webpackConfig,
																				pluginOptions = {},
																				context: { env, paths }
																			}) => {
	const isEnvDevelopment = env === 'development';
	const isEnvProduction = env === 'production';

	// Check if Tailwind config exists
	const useTailwind = fs.existsSync(
		path.join(paths.appPath, 'tailwind.config.js')
	);

	// common function to get style loaders
	const getStyleLoaders = (cssOptions, preProcessor, loaderOptions) => {
		const loaders = [
			isEnvDevelopment && require.resolve('style-loader'),
			isEnvProduction && {
				loader: MiniCssExtractPlugin.loader,
				// css is located in `static/css`, use '../../' to locate index.html folder
				// in production `paths.publicUrlOrPath` can be a relative path
				options: paths.publicUrlOrPath.startsWith('.')
					? { publicPath: '../../' }
					: {},
			},
			{
				loader: require.resolve('css-loader'),
				options: cssOptions,
			},
			{
				// Options for PostCSS as we reference these options twice
				// Adds vendor prefixing based on your specified browser support in
				// package.json
				loader: require.resolve('postcss-loader'),
				options: {
					postcssOptions: {
						// Necessary for external CSS imports to work
						// https://github.com/facebook/create-react-app/issues/2677
						ident: 'postcss',
						config: false,
						plugins: !useTailwind
							? [
								'postcss-flexbugs-fixes',
								[
									'postcss-preset-env',
									{
										autoprefixer: {
											flexbox: 'no-2009',
										},
										stage: 3,
									},
								],
								// Adds PostCSS Normalize as the reset css with default options,
								// so that it honors browserslist config in package.json
								// which in turn let's users customize the target behavior as per their needs.
								'postcss-normalize',
							]
							: [
								'tailwindcss',
								'postcss-flexbugs-fixes',
								[
									'postcss-preset-env',
									{
										autoprefixer: {
											flexbox: 'no-2009',
										},
										stage: 3,
									},
								],
							],
					},
					sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
				},
			},
		].filter(Boolean);
		if (preProcessor) {
			loaders.push(
				{
					loader: require.resolve('resolve-url-loader'),
					options: {
						sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
						root: paths.appSrc,
					},
				},
				{
					loader: require.resolve(preProcessor),
					options: {
						sourceMap: true,
						...loaderOptions,
					},
				}
			);
		}
		return loaders;
	};

	const loaders = webpackConfig
		.module
		?.rules
		?.find(rule =>	Array.isArray(rule?.oneOf))
		?.oneOf;

	if (!loaders) {
		return webpackConfig;
	}

	loaders.splice(
		loaders.length - 1,
		0,
		{
			test: stylusRegex,
			exclude: stylusModuleRegex,
			use: getStyleLoaders(
				{
					importLoaders: 3,
					sourceMap: isEnvProduction
						? shouldUseSourceMap
						: isEnvDevelopment,
					modules: {
						mode: 'icss',
					},
				},
				'stylus-loader',
				pluginOptions
			),
			// Don't consider CSS imports dead code even if the
			// containing package claims to have no side effects.
			// Remove this when webpack adds a warning or an error for this.
			// See https://github.com/webpack/webpack/issues/6571
			sideEffects: true,
		},
		// Adds support for CSS Modules, but using Stylus
		// using the extension .module.styl or .module.stylus
		{
			test: stylusModuleRegex,
			use: getStyleLoaders(
				{
					importLoaders: 3,
					sourceMap: isEnvProduction
						? shouldUseSourceMap
						: isEnvDevelopment,
					modules: {
						mode: 'local',
						getLocalIdent: getCSSModuleLocalIdent,
					},
				},
				'stylus-loader',
				pluginOptions
			),
		}
	);

	return webpackConfig;
};
