'use strict';

const _ = require('lodash');
const join = require('path').join;
const dirname = require('path').dirname;
const resolve = require('path').resolve;
const basename = require('path').basename;

const dt = require('directory-tree').directoryTree;

function TreeWalker(root, filters) {

    const rootName = basename(root);
    const rootPath = `/${rootName}`;

    Object.defineProperty(this, 'walk', {

        value: start => {

            const componentPath = start ? join(rootPath, start) : rootPath;
            const absoluteComponentPath = resolve(root, `./${start || ''}`);
            const componentTree = dt(absoluteComponentPath, filters);

            return marshall(componentPath, componentTree);
        }
    });
}

function marshall(componentPath, tree) {

    const path = tree.path === '' ? dirname(componentPath) : `/${tree.path}`;
    const parent = dirname(path);
    const name = tree.name;

    const children = _.chain(tree.children)
            .filter(child => child.type === 'directory')
            .map(child => marshall(componentPath, child))
            .value();

    const isModule = _.some(tree.children, child => child.type !== 'directory');

    const marshalled = {parent, path, name, isModule};

    if (children.length) {
        marshalled.children = children;
    }

    return marshalled
}

module.exports = (root, filters) => new TreeWalker(root, filters);