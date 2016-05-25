'use strict';

const join = require('path').join;
const webpack = require('webpack');

const outputPath = join(process.cwd(), 'app', 'public', 'js');

function merge(config) {

    return Object.assign({}, {
        module: {
            loaders:[
                { test: /\.js$/, loader:'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } }
            ]
        },
        plugins: [
            // new webpack.optimize.DedupePlugin(),
            // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ]
    }, config);
}

module.exports = [
    merge({
        name: 'main',
        entry: {
            main: join(process.cwd(), 'src', 'js', 'main.js'),
            sw: join(process.cwd(), 'src', 'js', 'sw.js')
        },
        output: {
            path: join(process.cwd(), 'app', 'public', 'js'),
            filename: '[name].bundle.js'
        }
    }),
    merge({
        name: 'ZOOL',
        entry: join(process.cwd(), 'src', 'js', 'zool.js'),
        output: {
            path: outputPath,
            filename: 'zool.lib.js',
            library: 'ZOOL',
            libraryTarget: 'umd'
        }
    })
];
