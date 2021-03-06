const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const generatePlugins = configs => {
    const plugins = [
        new CleanWebpackPlugin()
    ];
    // 根据入口个数来自动生成index页面
    const entries = Object.keys(configs.entry);
    entries.forEach(entry => {
        plugins.push(new HtmlWebpackPlugin({
            title: 'HtmlWebpackPlugin使用',
            filename: `${entry}.html`,
            template: './src/index.html',
            chunks: [entry, 'vendors', 'runtime'] // 配置入口需要加载的chunk
        }));
    });
    const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
    files.forEach(file => {
        if (/.*\.dll.js/.test(file)) {
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, '../dll', file)
            }));
        }
        if (/.*\.manifest.json/.test(file)) {
            plugins.push(new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, '../dll', file)
            }));
        }
    });
    return plugins;
};
const configs = {
    // entry: './src/index.js',
    entry: {
        index: './src/index.js',
        list: './src/list.js'
    },
    output: {
        // publicPath: '/',
        // filename: 'bundle.js',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                // less-loader会将less语法转化为css语法
                // css-loader会分析多个css文件之间的关系(@import语法等)，把多个css文件合并成一段css代码
                // style-loader将合并后的css插入到html文件的style标签中
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // modules: true // 开启css模块化打包
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpg|txt|png|gif)$/,
                use: [{
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        // [name]是源文件名称
                        // [ext]是源文件后缀
                        name: '[name].[hash].[ext]', // 配置打包后的文件名称
                        limit: 8192, // 图片大于4kb，会打包生成图片，小于的话会进行base64编码
                        outputPath: 'images/' // 指定打包后文件放到dist目录下的images目录下
                    }
                }]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            // chunks: 'all', // all表示同步和异步代码都进行代码分割
            // cacheGroups: {
            //     vendors: false,
            //     default: false
            // },
            chunks: 'all', // 默认是只对异步代码进行代码分割
            minSize: 30000, // 引入的模块大于30kb的时候才代码分割
            maxSize: 0, // 一般不用
            minChunks: 1, // 模块的最小引用次数
            maxAsyncRequests: 5, // 同时加载的文件数为5个
            maxInitialRequests: 3,
            automaticNameDelimiter: '~', // 文件名之间的连接符
            automaticNameMaxLength: 30, // 文件名最大的长度
            name: true, // 可以对生成的文件进行重命名，如在cacheGroups配置filename
            // cacheGroups: {
            //     vendors: false,
            //     default: false
            // }
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    // filename: 'vendors.js'
                },
                // default: false
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'common.js'
                }
            }
        }
    }
};

configs.plugins = generatePlugins(configs);
module.exports = configs;