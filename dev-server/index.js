'use strict';

const config = require('../webpack.config.js');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = function (PORT, APP_PORT) {

    const devServer = new WebpackDevServer(webpack(config), {
        publicPath: '/_assets/js/',
        proxy: { '*': `http://localhost:${APP_PORT}` },

        noInfo: false,
        stats: { colors: true }
    });

    devServer.listen(PORT, 'localhost');

};
