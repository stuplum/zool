'use strict';

const transform = require('babel-core').transform;

module.exports = [
    {
        ext: '.js',

        transform: (content, filename) => {

            if (filename.indexOf('node_modules') === -1) {

                const babelOptions = {
                    sourceMap: 'inline',
                    filename: filename,
                    sourceFileName: filename,
                    presets: ['es2015']
                };
    
                return transform(content, babelOptions).code;
            }

            return content;
        }
    }
];