const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
	entry: './src/pixel-icon.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'pixel-icon.js',
		path: path.resolve(__dirname, '../lib'),
		library: 'PixelIcon',
		libraryExport: 'default',
		libraryTarget: 'umd'
	}
}
