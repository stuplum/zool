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

module.exports = MarkdownParser;
