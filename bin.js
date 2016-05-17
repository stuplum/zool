#! /usr/bin/env node

const getPort = require('./app/lib/port-chooser').getPort;

require('./app/index')(getPort());
