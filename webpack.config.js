var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');


module.exports = {
    mode: 'development',
    entry: [__dirname + "/src/app/index.js", "./src/index.jsx"],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
              test: /\.(m?js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.otf$/,
                loader: 'url-loader?limit=100000'
              },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        }),
        new Dotenv(),
        new HtmlWebpackPlugin({
            "files": {
            "js": [ "src/config.js" ],
            "chunks": {
                        "head": {
                                    "entry":  "src/config.js",
                                    "output":  "config.js",
                                },
                     }
            }
        })
    ],
    output: {
        filename: '[name].js',
    },
    devServer: {
        historyApiFallback: true,
	// disableHostCheck: true,
    //     host: '0.0.0.0',
    //     port: '8001'
    },
    externals: {
        config: JSON.stringify({
            entry: ["./src/config.js"],
            output: {
                filename: '[name].js',
            },
        }),
        
    }
}
