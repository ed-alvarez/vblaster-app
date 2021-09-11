const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: path.resolve(__dirname, '../src/index.jsx'),
	output: {
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			assets: path.resolve(__dirname, '../src/assets')
		}
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader'
					}
				],
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
				use: {
					loader: 'file-loader'
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}

			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, '../src', 'index.html'),
			favicon: path.resolve(__dirname, '../src', 'assets/img/logo.png'),
			filename: './index.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true
			}
		}),
		new Dotenv({
			path: path.resolve(__dirname, '../', '.env')
		})
	]
};
