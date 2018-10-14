const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'builds'),
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 3000
    },
    target: "web",
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        'babel-regenerator-runtime',
        path.join(__dirname, '../index.js')
    ],
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: [
                    path.resolve(__dirname, '..', 'index.js'),
                    path.resolve(__dirname, '..', 'src'),
                ],
                loader: 'babel-loader?+cacheDirectory',
                query: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                loader: 'url-loader',
                query: {name: '[name].[hash:16].[ext]'}
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                ]
            },
            {
              test: /postMock.html$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
              },
            },
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, '..', 'node_modules')
        ],
        extensions: ['.web.js', '.js', '.scss']
    }
};
