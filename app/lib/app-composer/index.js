'use strict';

const Path = require('path');

const Glue = require('glue');
const hoek = require('hoek');

const manifestor = require('../manifestor');
const treeWalker = require('../tree-walker');

module.exports = (config, cb) => {

    const fileName = 'README.md';
    const componentsDir = Path.resolve(process.cwd(), config.componentsDir);
    const componentTree = treeWalker(componentsDir, [Path.extname(fileName)]).walk();

    Glue.compose(manifestor(config), {}, (err, server) => {

        hoek.assert(!err, err);

        server.route(require('../../routes')(config));

        cb(server, { componentTree });
    });

};
