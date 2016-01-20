'use strict';

const fs = require('fs');
const join = require('path').join;
const resolve = require('path').resolve;

const ZoolSass = require('zool-sass');
const ZoolConfig = require('./lib/zool-config');
const treeWalker = require('./lib/tree-walker');

const Hapi = require('hapi');
const hoek = require('hoek');
const inert = require('inert');

const Vision = require('vision');
const marked = require('marked');
const Nunjucks = require('nunjucks');
const handlebars = require('handlebars');

const internals = {};

const handlers = {

    markdown: config => (request, reply) => {

        const modulePath = resolve(process.cwd(), config.componentPath);

        const componentName = request.params.location;
        const componentPath = `${modulePath}/${componentName}`;

        const walkedTree = treeWalker(modulePath).walk();

        fs.readFile(`${componentPath}/README.md`, 'utf8', (err, markdown) => {
            reply.view('view/component', {
                application: 'Pottermore',
                componentName: componentName,
                location: componentPath,
                example: marked(markdown),
                modules: walkedTree.items
            });
        });
    }
};

internals.main = config => {

    const port = Number(process.argv[2] || 8080);
    const server = new Hapi.Server();

    const manifest = [
        { register: Vision },
        { register: inert },
        {
            register: ZoolSass,
            options: {
                force: true,
                debug: config.debug,
                entryPoint: config.sass.entryPoint,
                extension: config.sass.extension,
                src: config.componentPath,
                dest: './_compiled/css',
                includePaths: [config.componentPath],
                outputStyle: 'nested',
                sourceComments: true
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
                        options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
                        return next();
                    }
                }
            },
            path: join(__dirname, 'templates')
        });

        server.route([
            { method: 'GET', path: '/favicon.ico', handler: { file: './public/favicon.ico' } }
        ]);

        server.route({ method: 'GET', path: '/assets/{param*}',
            handler: {
                directory: {
                    path: join(__dirname, 'public'),
                    listing: true
                }
            }
        });

        server.route({ method: 'GET', path: '/{location*}', handler: handlers[config.componentTemplates](config) });

    });

    server.start(() => {
        console.log(`App started on port ${port}`);
    });

};

internals.main(new ZoolConfig().create(process.cwd(), __dirname));