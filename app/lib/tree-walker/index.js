'use strict';

let _    = require('lodash'),
    path = require('path'),
    dt   = require('directory-tree').directoryTree;

function TreeWalker(root) {

    let rootName = path.basename(root),
        rootPath = `/${rootName}`;

    Object.defineProperty(this, 'walk', {

        value: start => {

            let componentPath = start ? path.join(rootPath, start) : rootPath,
                absoluteComponentPath = path.resolve(root, `./${start || ''}`);

            let componentTree = dt(absoluteComponentPath);

            //console.log('componentTree.type...', componentTree.type);

            return marshall(componentPath, componentTree);
        }
    });
}

function marshall(componentPath, tree) {

    let parentDir = path.dirname(componentPath);

    let parent = parentDir === '/' ? componentPath : parentDir,
        name   = tree.name,
        items  = tree.children ? tree.children.map(child => asItem(componentPath, child)) : [];

    return { name, parent, items };
}

function marshallFile(componentPath, tree) {

    let parentDir = path.dirname(componentPath);

    let parent = parentDir === '/' ? componentPath : parentDir,
        name   = tree.name,
        items  = tree.children ? tree.children.map(child => asItem(componentPath, child)) : [];

    return { name, parent, items };
}

let as = {

    directory: function () {

    },

    file: function () {
        console.log()
    }
};

function asItem(componentPath, child) {

    let fullPath = toUri(componentPath, child);

    return _.assign(path.parse(fullPath), { uri: fullPath });
}

function toUri(componentPath, child) {
    return path.join(componentPath, child.path);
}

module.exports = root => new TreeWalker(root);