'use strict';

import jqueryMatchers from 'jasmine-jquery-matchers';
// import customMatchers from './custom-matchers';

let libContext = require.context('../src', true, /\.spec\.js$/);
libContext.keys().forEach(libContext);

// let modulesContext = require.context('../app', true, /\.spec\.js$/);
// modulesContext.keys().forEach(modulesContext);

global.$ = require('jquery');

beforeEach(function() {
    jasmine.addMatchers(Object.assign({}, jqueryMatchers));
});
