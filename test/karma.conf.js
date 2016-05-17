'use strict';

const webpackConf = require('../webpack.config');

module.exports = function (config) {

    config.set({

        basePath: '',

        frameworks: ['jasmine', 'jasmine-sinon'],

        files: [
            {pattern: 'test.webpack.js', watched: false}
        ],

        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        webpack: {
            devtool: 'inline-source-map',
            module: webpackConf[0].module
        },

        webpackServer: {
            noInfo: true
        },

        plugins: [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-jasmine-sinon'),
            require('karma-sourcemap-loader'),
            require('karma-webpack')
        ]
    })

};
