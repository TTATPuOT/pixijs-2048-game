const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin-advanced')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ['./scripts/app.ts', './styles/app.sass'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '',
	},
	devServer: {},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(sass|scss)$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'app.bundle.css',
		}),
		new CopyWebpackPlugin([
			{
				from: './assets/**/**',
				flatten: true,
			},
			{
				from: 'index.html',
			},
		]),
	],
}
