'use strict';

const argv = require('yargs').argv;

const appServer = require('./app');

const PORT = Number(process.env.PORT || argv.port);

appServer(PORT);
