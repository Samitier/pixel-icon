const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
	entry: './editor/editor.ts',
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
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
		  title: 'My App',
		  template: './editor/editor.html'
		})
	]
}
