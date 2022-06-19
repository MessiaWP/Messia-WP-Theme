const webpack = require('webpack'),
	path = require('path'),
	miniCss = require('mini-css-extract-plugin'),
	BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
	autoprefixer = require('autoprefixer'),
	CopyPlugin = require('copy-webpack-plugin'),
	CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	StylelintPlugin = require('stylelint-webpack-plugin'),
	localConfig = require('./webpack-local.json'),
	CriticalCssPlugin = require('critical-css-webpack-plugin'),
	{ refreshStyles } = require('less');

const
	themePath = '.',
	assetsPath = 'includes/assets',
	cssPath = `${assetsPath}/css`,
	jsPath = `${assetsPath}/js`,
	imgPath = `${assetsPath}/images`,
	audioPath = `${assetsPath}/audio`;

function getConfig(env) {
	const config = {
		mode: env,
		optimization: {
			minimize: false,
			minimizer: [],
		},
		resolve: {
			alias: {
				nodeModules: path.resolve(__dirname, 'node_modules/')
			}
		},
		performance: {
			hints: false
		},
		entry: {
			/* BACKEND */
			'backend/libraries/dialog': './src/entries/backend/libraries/entry-dialog.js',
			'backend/libraries/radio-segment': './src/entries/backend/libraries/entry-radio-segment.js',
			'backend/backend': './src/entries/backend/entry-backend.js',
			'backend/jquery-ui': './src/entries/backend/entry-jquery-ui.js',
			'backend/jquery-ui-1.11': './src/entries/backend/entry-jquery-ui-1.11.js',
			'backend/media': './src/entries/backend/entry-media.js',
			'backend/menu-page': './src/entries/backend/entry-menu-page.js',
			'backend/post-edit': './src/entries/backend/entry-post-edit.js',
			'backend/term-edit': './src/entries/backend/entry-term-edit.js',
			'backend/post-list': './src/entries/backend/entry-post-list.js',
			'backend/settings': './src/entries/backend/entry-settings.js',
			'backend/widgets': './src/entries/backend/entry-widgets.js',
			'backend/widgets-constructor-fields': './src/entries/backend/entry-widgets-constructor-fields.js',
			'backend/widgets-filters': './src/entries/backend/entry-widgets-filters.js',
			'backend/widgets-tabs-panel': './src/entries/backend/entry-widgets-tabs-panel.js',
			/* FRONTEND */
			'libraries/fancybox': './src/entries/entry-fancybox.js',
			'libraries/slick-carousel': './src/entries/entry-slick-carousel.js',
			'libraries/select2': './src/entries/entry-select2.js',
			'libraries/ion-range': './src/entries/entry-ion-range-slider.js',
			'frontend': './src/entries/entry-frontend.js',
			'listing-default': './src/entries/entry-listing-default.js',
			'object-default': './src/entries/entry-object-default.js',
			'home-default': './src/entries/entry-home-default.js',
			'errors': './src/entries/entry-errors.js',
			'page': './src/entries/entry-page.js',
			'single': './src/entries/entry-single.js',
			'archive': './src/entries/entry-archive.js',
			'comment-form': './src/entries/entry-comment-form.js',
			'comment-list': './src/entries/entry-comment-list.js',
			'messia-worker': './src/entries/entry-worker.js',
			'blocks/block-blocks': './src/entries/blocks/blocks.js',
			'blocks/block-blocks-editor': './src/entries/blocks/blocks-editor.js',
			'blocks/block-post-content': './src/entries/blocks/post-content.js',
			'blocks/block-post-content-editor': './src/entries/blocks/post-content-editor.js',
			'blocks/block-category-terms-editor': './src/entries/blocks/category-terms-editor.js',
			'blocks/block-category-terms': './src/entries/blocks/category-terms.js',
			'blocks/block-search-snippet-editor': './src/entries/blocks/search-snippet-editor.js',
			'blocks/block-search-snippet': './src/entries/blocks/search-snippet.js',
			'blocks/block-category-crosslinks-editor': './src/entries/blocks/category-crosslinks-editor.js',
			'blocks/block-category-crosslinks': './src/entries/blocks/category-crosslinks.js',
			'blocks/block-listing-data-editor': './src/entries/blocks/listing-data-editor.js',
			'blocks/block-listing-data': './src/entries/blocks/listing-data.js',
			'blocks/block-listing-filters-editor': './src/entries/blocks/listing-filters-editor.js',
			'blocks/block-listing-filters': './src/entries/blocks/listing-filters.js',
			'blocks/block-objects-filtered-editor': './src/entries/blocks/objects-filtered-editor.js',
			'blocks/block-objects-filtered': './src/entries/blocks/objects-filtered.js',
			'blocks/block-testimonials-editor': './src/entries/blocks/testimonials-editor.js',
			'blocks/block-testimonials': './src/entries/blocks/testimonials.js',
			'blocks/block-object-categories-editor': './src/entries/blocks/object-categories-editor.js',
			'blocks/block-object-categories': './src/entries/blocks/object-categories.js',
			'blocks/block-object-properties-editor': './src/entries/blocks/object-properties-editor.js',
			'blocks/block-object-properties': './src/entries/blocks/object-properties.js',
			'blocks/block-sitewide-search-editor': './src/entries/blocks/sitewide-search-editor.js',
			'blocks/block-sitewide-search': './src/entries/blocks/sitewide-search.js',
			'blocks/block-tabs-panel-editor': './src/entries/blocks/tabs-panel-editor.js',
			'blocks/block-tabs-panel': './src/entries/blocks/tabs-panel.js',
			'blocks/block-custom-fields-editor': './src/entries/blocks/custom-fields-editor.js',
			'blocks/block-custom-fields': './src/entries/blocks/custom-fields.js',
			'blocks/block-segment-wrapper-editor': './src/entries/blocks/segment-wrapper-editor.js',
			'blocks/block-segment-wrapper': './src/entries/blocks/segment-wrapper.js',
		},
		output: {
			filename: function () {
				return env === 'production' ? `${jsPath}/[name].min.js` : `${jsPath}/[name].js`;
			},
			path: path.resolve(__dirname, themePath),
		},
		module: {
			rules: [
				{
					test: /select2.full\.js$/,
					use: ['script-loader'] // Executes JS script once in global context.
				},
				{
					test: /slick\.js$/,
					use: ['script-loader'] // Executes JS script once in global context.
				},
				{
					test: /rangeSlider\.js$/,
					use: ['script-loader'] // Executes JS script once in global context.
				},
				// Frontend
				{
					test: /(?<!backend.*)\.(png|jpe?g|gif|svg)$/,
					type: 'asset/resource',
					generator: {
						filename: (PathData) => {
							const rel = path.relative('src/images', PathData.filename).replace(/\\/g, "/");
							return `${imgPath}/${rel}`;
						},
						emit: false,
						publicPath: (PathData) => {
							return '../../../';
						}
					}
				},
				// Backend
				{
					test: /(?<=backend.*)\.(png|jpe?g|gif|svg)$/,
					type: 'asset/resource',
					generator: {
						filename: (PathData) => {
							const rel = path.relative('src/images', PathData.filename).replace(/\\/g, "/");
							return `${imgPath}/${rel}`;
						},
						emit: false,
						publicPath: (PathData) => {
							return '../../../../';
						}
					}
				},
				{
					test: /\.(jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.(s*)css$/,
					exclude: /node_modules/,
					use: [
						miniCss.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [autoprefixer()],
								},
								sourceMap: true,
							}
						},
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
								sassOptions: {
									includePaths: ['./node_modules']
								},
								sourceMap: true,
							},
						},
					]
				},
				{
					test: /\.less$/i,
					exclude: /node_modules/,
					use: [
						miniCss.loader,
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [autoprefixer()],
								},
								sourceMap: true,
							}
						},
						{
							loader: "less-loader",
							options: {
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		plugins: [
			new miniCss({
				filename: env === 'production' ? `${cssPath}/[name].min.css` : `${cssPath}/[name].css`
			}),
			new webpack.ProvidePlugin({
				//$: 'jquery',
				//jQuery: 'jquery',
				//'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default'],
			}),
			/* new CriticalCssPlugin({
				base: path.resolve(__dirname, themePath),
				src: `${localConfig.siteHost}/rent/estate/`,
				target: env === 'production' ? `${cssPath}/critical-listing.min.css` : `${cssPath}/critical-listing.css`,
				inline: true,
				minify: true,
				extract: true,
				dimensions: [
					{
						width: 1920,
						height: 1080,
					},
					{
						width: 360,
						height: 640,
					},
				],
				penthouse: {
					blockJSRequests: false,
				}
			}), */
			new CopyPlugin({
				patterns: [
					{ from: 'src/images', to: `${imgPath}` },
					{ from: 'src/audio', to: `${audioPath}` },
				],
			}),
		],
	};

	if (config.mode === 'production') {
		config.optimization.minimize = true;
		config.optimization.minimizer = [
			//`...`, // extend existing minimizers (will start extract Licenses text into separate files).
			new TerserPlugin({
				extractComments: false,
			}),
			new CssMinimizerPlugin(),
		];

		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{ from: 'node_modules/select2/dist/js/select2.full.min.js', to: `${jsPath}/backend/libraries/select2.min.js` },
					{ from: 'node_modules/select2/dist/css/select2.min.css', to: `${cssPath}/backend/libraries/select2.min.css` },
					{ from: 'node_modules/spectrum-colorpicker2/dist/spectrum.min.js', to: `${jsPath}/backend/libraries/spectrum.min.js` },
					{ from: 'node_modules/spectrum-colorpicker2/dist/spectrum.min.css', to: `${cssPath}/backend/libraries/spectrum.min.css` },
					{ from: 'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js', to: `${jsPath}/backend/libraries/jquery-ui-touch-punch.min.js` },

					//{
					//	from: `${themePath}/${cssPath}/backend/*.js`,
					//	to: `${cssPath}/backend/[name].min.js`,
					//	globOptions: {
					//		ignore: ["**/*.min.*"],
					//},
					//},
					//{
					//	from: `${themePath}/${jsPath}/backend/*.js`,
					//	to: `${jsPath}/backend/[name].min.js`,
					//	globOptions: {
					//		ignore: ["**/*.min.*"],
					//	},
					//},
				],
			})
		);

		// Minimize CSS
		/* config.plugins.push(
			new CssMinimizerPlugin({
				test: [
					/\/backend\/libraries\/select2.min.css$/i,
					/\/backend\/libraries\/spectrum.min.css$/i,
					/\/backend\/libraries\/jquery-ui-touch-punch.min.css$/i,
				],
				test: [
					/\/backend\/.*\.min.css$/i,
				],
			}),
		); */

		// Minimize JS
		/* config.plugins.push(
			new TerserPlugin({
				test: [
					/\/backend\/libraries\/select2.min.js$/i,
					/\/backend\/libraries\/spectrum.min.js$/i,
					/\/backend\/libraries\/jquery-ui-touch-punch.min.js$/i,
				],
				extractComments: false,
			})
		); */
	}

	if (config.mode === 'development') {

		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{ from: 'node_modules/select2/dist/js/select2.full.js', to: `${jsPath}/backend/libraries/select2.js` },
					{ from: 'node_modules/select2/dist/css/select2.css', to: `${cssPath}/backend/libraries/select2.css` },
					{ from: 'node_modules/spectrum-colorpicker2/src/spectrum.js', to: `${jsPath}/backend/libraries/spectrum.js` },
					{ from: 'node_modules/spectrum-colorpicker2/src/spectrum.css', to: `${cssPath}/backend/libraries/spectrum.css` },
					{ from: 'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js', to: `${jsPath}/backend/libraries/jquery-ui-touch-punch.js` },
				],
			})
		);
		config.plugins.push(
			new BrowserSyncPlugin(
				{
					notify: true,
					host: 'localhost',
					port: 4000,
					logLevel: 'silent',
					files: [
						`${themePath}/**/*.*`,
					],
					proxy: {
						target: localConfig.siteHost,
						ws: true
					},
					/* https: {
						key: `${localConfig.certPath}/server.key`,
						cert: `${localConfig.certPath}/server.crt`,
					}, */
				},
				{
					reload: false
				}
			)
		);
		config.plugins.push(
			new StylelintPlugin({
				configFile: '.stylelintrc',
				files: ['src/less', 'src/scss'],
				extensions: ['scss', 'less'],
				failOnError: true,
				failOnWarning: false,
				quiet: false,
				fix: true,
			})
		);
		config.devtool = 'inline-source-map';
	}

	return config;
}

if (process.env.npm_lifecycle_event === 'dev') {

	module.exports = [
		getConfig('development'),
	];
}
else if (process.env.npm_lifecycle_event === 'prod') {
	module.exports = [
		getConfig('development'),
		getConfig('production'),
	];
}
