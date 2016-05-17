'use strict';

const injector = require('inject!../proxy');

describe('Proxy', () => {

    let debugStub, Proxy, proxy;

    beforeEach(() => {

        debugStub = sinon.stub();

        Proxy = getProxy(debugStub);

        proxy = new Proxy();

    });

    it('should add a resource', () => {

        // When:
            proxy.add('http://some.url', 'some response');

        // Then:
            expect(proxy.resources['http://some.url']).toEqual('some response');

    });

    it('should add a debug message when debug is enabled when adding a resource', () => {

        // Given:
            const url = 'http://some.url';
            const response = 'some response';

        // When:
            proxy.setDebug(true);

        // And:
            proxy.add(url, response);

        // Then:
            expect(debugStub).toHaveBeenCalledWith('SW:proxy:add', url, response);

    });

    it('should not add a debug message when debug is disabled when adding a resource', () => {

        // When:
            proxy.add('not', 'bovvered');

        // Then:
            expect(debugStub).not.toHaveBeenCalled();

    });

    it('should return a response when a url is matched', () => {

        // When:
            proxy.add('http://match.me', 'some matched response');

        // Then:
            expect(proxy.match('http://match.me')).toEqual({
                response: 'aResponse',
                delay: 0
            });

    });

    it('should return null when a url is not matched', () => {

        // When:
            proxy.add('http://match.me', 'some matched response');

        // Then:
            expect(proxy.match('http://who.ru')).toBeNull();

    });

    function getProxy(debugStub) {
        return injector({
            '../logger': { debug: debugStub },
            './response': { createResponse: sinon.stub().returns('aResponse') }
        }).default;
    }
});
