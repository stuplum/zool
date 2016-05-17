'use strict';

const Path = require('path');

const Glue = require('glue');
const hoek = require('hoek');

const manifestor = require('../manifestor');
const treeWalker = require('../tree-walker');

module.exports = (config, cb) => {

    const componentHome = config.componentHome;
    const componentBase = Path.resolve(process.cwd(), config.componentBase);
    const componentTree = treeWalker(componentBase, [Path.extname(componentHome)]).walk();

    Glue.compose(manifestor(config), {}, (err, server) => {

        hoek.assert(!err, err);

        server.route(require('../../routes')(config));

        cb(server, { componentTree });
    });

};
