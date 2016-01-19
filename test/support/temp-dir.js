'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');

const uuid = require('node-uuid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const object = require('mout/object');

const tmpDir = os.tmpdir ? os.tmpdir() : os.tmpDir();
const tmpLocation = path.join(tmpDir, 'zool-config-tests');
const tmpLocationUUID = path.join(tmpLocation, uuid.v4().slice(0, 8));

after(function (done) {
    rimraf.sync(tmpLocation);
    done();
});

module.exports = (function() {

    function TempDir (defaults) {
        this.path = path.join(tmpLocationUUID, uuid.v4());
        this.defaults = defaults;
    }

    TempDir.prototype.create = function (files) {

        var that = this;

        if (files) {
            object.forOwn(files, function (contents, filepath) {
                if (typeof contents === 'object') {
                    contents = JSON.stringify(contents, null, ' ') + '\n';
                }

                var fullPath = path.join(that.path, filepath);
                mkdirp.sync(path.dirname(fullPath));
                fs.writeFileSync(fullPath, contents);
            });
        }

        return this;
    };

    TempDir.prototype.prepare = function (files) {
        rimraf.sync(this.path);
        mkdirp.sync(this.path);
        this.create(files);

        return this;
    };

    return TempDir;

})();