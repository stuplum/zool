'use strict';

const fs = require('fs');

const marked = require('marked');
const Boom = require('boom');

class MarkdownParser {

    constructor(APP_NAME, fileName) {
        this.APP_NAME = APP_NAME;
        this.fileName = fileName;
    }

    parse(name, path, cb) {

        fs.readFile(`${path}/${this.fileName}`, 'utf8', (err, markdown) => {

            if (err) {
                throw Boom.notFound(`${name} not found`, { stacktrace: err, from: this.APP_NAME });
            }

            cb(marked(markdown), name, path);
        });

    }
}

// function getMarkdown(type, request, componentHome, cb) {
//
//     const componentName = request.params.location;
//     const componentPath = `${componentBase}/${componentName}`;
//
//     fs.readFile(`${componentPath}/${componentHome}`, 'utf8', (err, markdown) => {
//
//         if (err) {
//             throw Boom.notFound(`${componentName} ${type} not found`, { stacktrace: err, from: config.APP_NAME });
//         }
//
//         cb(marked(markdown), componentName, componentPath);
//     });
// };

module.exports = MarkdownParser;
