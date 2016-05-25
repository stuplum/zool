'use strict';

const decamelize = require('decamelize');
const omit = require('lodash').omit;

function pluginFromConfig(name, config, options) {
    return {
        plugin: {
            register: `zool-${decamelize(name, '-')}`,
            options: Object.assign({
                debug: config.debug || false,
                src: config.componentsDir
            }, options || {})
        }
    }
}

class Manifestor {

    constructor(config) {

        config = Object.assign({ plugins: {} }, config);

        this.manifest = {
            connections: [ { port: config.PORT || 8080 } ],
            registrations: [{
                plugin: { register: 'vision' }
            }, {
                plugin: { register: 'inert' }
            }, {
                plugin: {
                    register: 'zool-static-assets',
                    options: Object.assign({
                        debug: config.debug || false,
                        baseDir: config.componentsDir,
                        aliases: {'/frame': ''}
                    }, config.plugins.staticAssets || {})
                }
            }]
        };

        this._addPlugins(config);

    }

    _addPlugins(config) {

        const plugins = omit(config.plugins, ['staticAssets']);
        const _config = omit(config, ['plugins']);

        for (let plugin in plugins) {
            this.manifest.registrations.push(pluginFromConfig(plugin, _config, plugins[plugin]));
        }
    }

    generate() {
        return this.manifest;
    }
}

module.exports = function (config) {
    return new Manifestor(config).generate();
};
