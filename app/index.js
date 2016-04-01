'use strict';

const APP_NAME = 'zool';
const version = require(`${process.cwd()}/package.json`).version;

const fs = require('fs');
const join = require('path').join;
const extname = require('path').extname;
const resolve = require('path').resolve;
const moment = require('moment');

const ZoolSass = require('zool-sass');

const ZoolConfig = require('./lib/zool-config');
const zoolUtils = require('zool-utils');
const onBoom = zoolUtils.onBoom;
const zoolLogger = zoolUtils.ZoolLogger;
const logger = zoolLogger(APP_NAME);

const Glue = require('glue');
const Boom = require('boom');
const hoek = require('hoek');

const marked = require('marked');
const highlight = require('highlight.js').highlight;

const manifestor = require('./lib/manifestor');
const treeWalker = require('./lib/tree-walker');

const internals = {};

internals.main = config => {

    const componentHome = config.componentHome;
    const componentExample = config.componentExample;
    const componentBase = resolve(process.cwd(), config.componentBase);
    const componentTree = treeWalker(componentBase, [extname(componentHome)]).walk();

    Glue.compose(manifestor(config), {}, (err, server) => {

        hoek.assert(!err, err);

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


        }, APP_NAME));

        server.ext('onPreResponse', (request, reply) => {

            const defaults = {
                brand: config.brand || 'ZOOL',
                componentTree: componentTree.children,
                year: moment().year(),
                version
            };

            if (request.response.variety === 'view') {
                Object.assign(request.response.source.context, defaults);
            }

            reply.continue();

        });

        function getMarkdown(type, request, componentHome, cb) {

            const componentName = request.params.location;
            const componentPath = `${componentBase}/${componentName}`;

            fs.readFile(`${componentPath}/${componentHome}`, 'utf8', (err, markdown) => {

                if (err) {
                    throw Boom.notFound(`${componentName} ${type} not found`, { stacktrace: err, from: APP_NAME });
                }

                cb(marked(markdown), componentName, componentPath);
            });
        }

        function replyWithUsage(request, cb) {
            getMarkdown('component', request, componentHome, cb);
        }

        function replyWithExample(request, cb) {
            getMarkdown('example', request, componentExample, cb);
        }

        function fileExists(path, cb) {
            fs.stat(path, err => cb(!err));
        }

        server.route([
            {
                method: 'GET', path: '/favicon.ico',
                handler: {
                    file: join(__dirname, 'public', 'favicon.ico')
                }
            },
            {
                method: 'GET', path: '/_sw.js',
                handler: {
                    file: join(__dirname, 'public', 'js', 'sw.js')
                }
            }, {
                method: 'GET', path: '/_assets/{param*}',
                handler: {
                    directory: {
                        path: join(__dirname, 'public'),
                        listing: true
                    }
                }
            }, {

                method: 'GET', path: '/{location*}',
                handler: (request, reply) => {
                    replyWithUsage(request, (usage, componentName, location) => {
                        fileExists(`${location}/${componentExample}`, hasExample => {

                            const opts = {
                                force: true,
                                entryPoint: config.plugins.sass.entryPoint,
                                extension: config.plugins.sass.extension,
                                src: config.componentBase,
                                dest: './_compiled/css',
                                includePaths: [config.componentBase],
                                outputStyle: 'expanded'
                            };

                            ZoolSass.compile(componentName, opts)

                                .then(css => {
                                    return `<pre class="hljs"><code class="css">${highlight('css', css).value}</code></pre>`;
                                })

                                .then(highlightedCss => {
                                    reply.view('view/component', { usage, componentName, location, hasExample, highlightedCss });
                                })

                                .catch(() => {
                                    reply.view('view/component', { usage, componentName, location, hasExample });
                                });

                        });
                    });
                }
            }, {

                method: 'GET', path: '/frame/{location*}',
                handler: (request, reply) => {
                    replyWithExample(request, (example, componentName) => {
                        reply.view('view/component-frame', {example, componentName});
                    });
                }
            }
        ]);

        server.start(() => {
            logger.log('App started', server.info.uri);
        });

    });

};

internals.main(new ZoolConfig().create(process.cwd(), __dirname));
