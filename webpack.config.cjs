const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './js/main.js',
        vendor: './js/libs.js',
    },
    devtool: isDev ? 'source-map' : false,
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    optimization: {
        minimize: !isDev,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.s[ac]ss|css$/i, // Регулярное выражение для .scss и .sass файлов
                use: [
                    'style-loader', // Создаёт стили из JS строк
                    'css-loader',     // Переводит CSS в CommonJS
                    'sass-loader'     // Компилирует Sass в CSS
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new CircularDependencyPlugin()
    ],
};
