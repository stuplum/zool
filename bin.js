#! /usr/bin/env node

const getPort = require('./app/lib/portChooser').getPort;

require('./app/index')(getPort());
