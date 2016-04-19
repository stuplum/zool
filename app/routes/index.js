'use strict';

const fs = require('fs');
const join = require('path').join;
const resolve = require('path').resolve;

const ZoolSass = require('zool-sass');

const marked = require('marked');
const highlight = require('highlight.js').highlight;

const Boom = require('boom');

module.exports = config => {

    const componentHome = config.componentHome;
    const componentExample = config.componentExample;
    const componentBase = resolve(process.cwd(), config.componentBase);

    function getMarkdown(type, request, componentHome, cb) {

        const componentName = request.params.location;
        const componentPath = `${componentBase}/${componentName}`;

        fs.readFile(`${componentPath}/${componentHome}`, 'utf8', (err, markdown) => {

            if (err) {
                throw Boom.notFound(`${componentName} ${type} not found`, { stacktrace: err, from: config.APP_NAME });
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

    return [
        {
            method: 'GET', path: '/favicon.ico',
            handler: {
                file: join(__dirname, '..', 'public', 'favicon.ico')
            }
        },
        {
            method: 'GET', path: '/_sw.js',
            handler: {
                file: join(__dirname, '..', 'public', 'js', 'sw.js')
            }
        }, {
            method: 'GET', path: '/_assets/{param*}',
            handler: {
                directory: {
                    path: join(__dirname, '..', 'public'),
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
                                reply.view('view/component', {
                                    usage,
                                    componentName,
                                    location,
                                    hasExample,
                                    highlightedCss
                                });
                            })

                            .catch(() => {
                                reply.view('view/component', {usage, componentName, location, hasExample});
                            });

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
    ];

};