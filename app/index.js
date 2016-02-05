'use strict';

const fs = require('fs');
const join = require('path').join;
const extname = require('path').extname;
const resolve = require('path').resolve;
const moment = require('moment');

const ZoolSass = require('zool-sass');
const ZoolWebpack = require('zool-webpack');
const ZoolConfig = require('./lib/zool-config');
const treeWalker = require('./lib/tree-walker');

const Hapi = require('hapi');
const Boom = require('boom');
const hoek = require('hoek');
const inert = require('inert');

const Vision = require('vision');
const marked = require('marked');
const Nunjucks = require('nunjucks');
const handlebars = require('handlebars');

const internals = {};

internals.main = config => {

    const componentHome = config.componentHome;
    const componentExample = config.componentExample;
    const componentBase = resolve(process.cwd(), config.componentBase);
    const componentTree = treeWalker(componentBase, [extname(componentHome)]).walk();

    const port = Number(process.argv[2] || 8080);
    const server = new Hapi.Server();

    const manifest = [
        {register: Vision},
        {register: inert},
        {
            register: ZoolSass,
            options: {
                force: true,
                debug: config.debug,
                entryPoint: config.sass.entryPoint,
                extension: config.sass.extension,
                src: config.componentBase,
                dest: './_compiled/css',
                includePaths: [config.componentBase],
                outputStyle: 'nested',
                sourceComments: true
            }
        },
        {
            register: ZoolWebpack,
            options: {
                debug: config.debug,
                src: config.componentBase
            }
        }
    ];

    server.connection({
        port: port,
        host: 'localhost'
    });

    server.register(manifest, err => {

        hoek.assert(!err, err);

        server.views({
            engines: {
                html: {
                    compile: function (src, options) {

                        const template = Nunjucks.compile(src, options.environment);

                        return function (context) {
                            return template.render(context);
                        };
                    },

                    prepare: function (options, next) {
                        options.compileOptions.environment = Nunjucks.configure(options.path, {watch: false});
                        return next();
                    }
                }
            },
            path: join(__dirname, 'templates')
        });


        server.ext('onPreResponse', (request, reply) => {

            const defaults = {
                brand: config.brand || 'ZOOL',
                componentTree: componentTree.children,
                year: moment().year()
            };

            const response = request.response;

            if (response.variety === 'view') {
                Object.assign(response.source.context, defaults);
            }

            if (request.response.isBoom) {

                const error = request.response.output.payload;
                const additionalData = request.response.data;

                // replace with zool-logger once its been written
                console.log('Error:', error);

                return reply
                    .view('view/error', Object.assign(defaults, {
                        error: Object.assign(error, additionalData)
                    }))
                    .code(error.statusCode);
            }

            reply.continue();
        });

        function getMarkdown(type, request, componentHome, cb) {

            const componentName = request.params.location;
            const componentPath = `${componentBase}/${componentName}`;

            fs.readFile(`${componentPath}/${componentHome}`, 'utf8', (err, markdown) => {

                if (err) {
                    throw Boom.notFound(`${componentName} ${type} not found`, { stacktrace: err });
                }

                cb(marked(markdown), componentName, componentPath);
            });
        }

        function replyWithUsage(componentName, cb) {
            getMarkdown('component', componentName, componentHome, cb);
        }

        function replyWithExample(componentName, cb) {
            getMarkdown('example', componentName, componentExample, cb);
        }

        server.route([
            {
                method: 'GET', path: '/favicon.ico',
                handler: {
                    file: './public/favicon.ico'
                }
            }, {
                method: 'GET', path: '/assets/{param*}',
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
                        fs.stat(`${location}/${componentExample}`, err => {
                            reply.view('view/component', { usage, componentName, location, hasExample: !err });
                        });
                    });
                }
            }, {

                method: 'GET', path: '/frame/{location*}',
                handler: (request, reply) => {
                    replyWithExample(request, (example, componentName) => {
                        reply.view('view/component-frame', { example, componentName });
                    });
                }
            }
        ]);

    });

    server.start(() => {
        console.log(`App started on port ${port}`);
    });

};

internals.main(new ZoolConfig().create(process.cwd(), __dirname));
