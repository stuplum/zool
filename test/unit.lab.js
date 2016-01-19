'use strict';

const path = require('path');
const glob = require('glob');
const Code = require('code');
const Lab  = require('lab');
const lab  = exports.lab = Lab.script();

global.describe = lab.describe;
global.it = lab.it;
global.before = lab.before;
global.beforeEach = lab.beforeEach;
global.after = lab.after;
global.afterEach = lab.afterEach;
global.expect = Code.expect;

global.fromRoot = requirePath => {
    return path.normalize(__dirname + '/../' + requirePath);
};

global.syncSpec = cb => done => {
    cb(); done();
};

const tests = glob.sync(__dirname + '/**/*.spec.js');
tests.forEach(fullPath => require(fullPath));