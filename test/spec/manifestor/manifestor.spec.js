'use strict';

const manifestor = require(fromRoot('app/lib/manifestor'));

describe('manifestor', () => {

    describe('connections', () => {

        it('should have a single connection', syncSpec(() => {

            let manifest = manifestor();

            expect(manifest.connections).to.have.length(1);

        }));

        it('should default to port 8080', syncSpec(() => {

            let manifest = manifestor();

            expect(manifest.connections[0].port).to.equal(8080);

        }));

        it('should use port from config', syncSpec(() => {

            let manifest = manifestor({ port: 1234 });

            expect(manifest.connections[0].port).to.equal(1234);

        }));

        it('should use port supplied via arguments');
        it('should use port from env');

    });

    describe('registrations', () => {

        it('should include vision', syncSpec(() => {

            let manifest = manifestor();

            expect(manifest.registrations[0]).to.deep.equal({ plugin: { register: 'vision' }});

        }));

        it('should include inert', syncSpec(() => {

            let manifest = manifestor();

            expect(manifest.registrations[1]).to.deep.equal({ plugin: { register: 'inert' }});

        }));

        it('should include static assets with aliases set correctly', syncSpec(() => {

            let manifest = manifestor({ componentBase: 'some-base' });

            expect(manifest.registrations[2]).to.deep.equal({
                plugin: {
                    register: 'zool-static-assets',
                    options: {
                        debug: false,
                        baseDir: 'some-base',
                        aliases: {'/frame': ''}
                    }
                }
            });

        }));

        it('should include other plugins from config', syncSpec(() => {

            let manifest = manifestor({ componentBase: 'some-base', plugins: {
                somePlugin: { someOption: 'some-option' }
            } });

            expect(manifest.registrations[3]).to.deep.equal({
                plugin: {
                    register: 'zool-some-plugin',
                    options: {
                        debug: false,
                        src: 'some-base',
                        someOption: 'some-option'
                    }
                }
            });

        }));

    });

});