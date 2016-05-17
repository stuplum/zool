'use strict';

const getPort = require('./app/lib/port-chooser').getPort;

const appServer = require('./app');
const devServer = require('./dev-server');

const PORT = getPort();
const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    const APP_PORT = PORT -1;
    appServer(APP_PORT);
    devServer(PORT, APP_PORT);
} else {
    appServer(PORT);
}

