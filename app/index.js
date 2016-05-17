'use strict';

const join = require('path').join;
const moment = require('moment');

const ZoolConfig = require('./lib/zool-config');
const zoolUtils = require('zool-utils');
const onBoom = zoolUtils.onBoom;
const zoolLogger = zoolUtils.ZoolLogger;

const appComposer = require('./lib/app-composer');

const internals = {};

internals.main = config => {

    const logger = zoolLogger(config.APP_NAME);

    appComposer(config, (server, context) => {

        server.views({
            engines: { html: require('./lib/compilers/htmlCompiler') },
            path: join(__dirname, 'templates')
        });

        server.ext('onPostHandler', onBoom((request, reply) => {

            const error = request.response;
            const errorPayload = error.output.payload;
            const statusCode = errorPayload.statusCode;

            logger[statusCode === 404 ? 'warn' : 'error'](errorPayload.error, error.message);

            return reply

                .view('view/error', Object.assign({}, {
                    error: Object.assign(errorPayload, error.data)
                }))

                .code(statusCode);


        }, config.APP_NAME));

        server.ext('onPreResponse', (request, reply) => {

            const defaults = {
                brand: config.brand || config.APP_NAME,
                componentTree: context.componentTree.children,
                year: moment().year(),
                version: config.version
            };

            if (request.response.variety === 'view') {
                Object.assign(request.response.source.context, defaults);
            }

            reply.continue();

        });

        server.start(() => {
            logger.log('App started', server.info.uri);
        });

    });

};

function getConfig(APP_NAME, PORT) {
    return Object.assign({
        version: require(`${process.cwd()}/package.json`).version,
        PORT,
        APP_NAME
    }, new ZoolConfig().create(process.cwd(), __dirname));
}

module.exports = function (PORT) {
    internals.main(getConfig('zool', PORT));
};

