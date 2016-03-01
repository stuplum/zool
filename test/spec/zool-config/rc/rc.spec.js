'use strict';

const TempDir = require('zool-test-support').TempDir;

const rc = require(fromRoot('app/lib/zool-config/util/rc'));

describe('rc', function() {

    var tempDir = new TempDir('zool-config-tests');

    tempDir.prepare({
        '.jsrc': 'module.exports = { dave: 123 };',
        '.daverc': { key: 'dave' },
        '.chazrc/foo': { key: 'chaz' }
    });

    after(function (done) {
        tempDir.clean();
        done();
    });

    it('correctly reads .xxxrc files', syncSpec(() => {

        const config = rc('dave', tempDir.path);

        expect(config.key).to.equal('dave');
        expect(config.key2).to.equal(undefined);
    }));

    it('correctly reads .xxxrc files when they contain js', syncSpec(() => {

        const config = rc('js', tempDir.path);

        expect(config.dave).to.equal(123);
    }));

    it('throws an easy to understand error if .xxxrc is a dir', syncSpec(() => {

        expect(function () {
            rc('chaz', tempDir.path);
        }).to.throw('.chazrc should not be a directory');

    }));

    it('throws an easy to understand error if .xxxrc does not exist');
    it('throws an easy to understand error if .xxxrc is empty');
});