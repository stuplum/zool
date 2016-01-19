'use strict';

const join = require('path').join;
const statSync = require('fs').statSync;
const readFile = require('fs').readFileSync;

function find(name, cwd) {

    const filePath = join(cwd, name);

    if (statSync(filePath).isDirectory()) {
        let error;
        error = new Error(name + ' should not be a directory');
        error.code = 'EFILEISDIR';
        throw error;
    }

    return readFile(filePath).toString();
}

function json(file) {
    return JSON.parse(file);
}

module.exports = function rc(name, cwd) {
    return json(find(`.${name}rc`, cwd));
}