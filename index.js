'use strict';

const getPort = require('./app/lib/portChooser').getPort;
const appServer = require('./app');

appServer(getPort());
