'use strict';

const argv = require('yargs').argv;

const DEFAULT_PORT = 8080;

module.exports = {
    getPort() {
        return Number(process.env.PORT || argv.port || DEFAULT_PORT);
    }
};
