'use strict';

const TempDir = require(fromRoot('test/support/temp-dir'));

const rc = require(fromRoot('app/lib/zool-config/util/rc'));

describe('rc', function() {

    var tempDir = new TempDir();

    tempDir.prepare({
        '.daverc': {
            key: 'dave'
        },
        '.chazrc/foo': {
            key: 'chaz'
        }
    });

    it('correctly reads .xxxrc files', syncSpec(() => {

        const config = rc('dave', tempDir.path);

        expect(config.key).to.equal('dave');
        expect(config.key2).to.equal(undefined);
    }));

    it('throws an easy to understand error if .xxxrc is a dir', syncSpec(() => {

        expect(function () {
            rc('chaz', tempDir.path);
        }).to.throw('.chazrc should not be a directory');

    }));

    it('throws an easy to understand error if .xxxrc does not exist');
    it('throws an easy to understand error if .xxxrc is empty');
});