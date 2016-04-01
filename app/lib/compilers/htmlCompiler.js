'use strict';

const Nunjucks = require('nunjucks');

module.exports = {

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
};
