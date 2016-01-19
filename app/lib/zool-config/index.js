'use strict';

const rc = require('./util/rc');

class Config {

    create(cwd, dirname) {

        const config = rc('zool', cwd);

        //console.log(config, cwd, dirname);

        return config;
    }
}

module.exports = Config;