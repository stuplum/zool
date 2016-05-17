'use strict';

const injector = require('inject!../sw-transport');

import MockServiceWorker from './mock-service-worker';

describe('sw-transport', () => {

    let serviceWorkerStub;

    beforeEach(() => {
        serviceWorkerStub = { get: sinon.stub() };
    });

    describe('whenReady', () => {

        it('should send a message to the service worker when the worker is ready and activated', () => {
            
            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                mockServiceWorker.ready.then.yields({ active: { state: 'activated' } });

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // Then:
                expect(mockServiceWorker.controller.postMessage).toHaveBeenCalledWith('some message');

        });

        it('should not send a message to the service worker when the worker is ready but not activated', () => {

            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                mockServiceWorker.ready.then.yields({ active: { state: 'some state' } });

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // Then:
                expect(mockServiceWorker.controller.postMessage).not.toHaveBeenCalled();

        });

        it('should not send a message to the service worker when the worker is not ready', () => {

            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // Then:
                expect(mockServiceWorker.controller.postMessage).not.toHaveBeenCalled();

        });

    });

    describe('whenChange', () => {

        it('should send a message to the service worker when controller and state have changed', () => {

            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // And:
                mockServiceWorker.oncontrollerchange();
                mockServiceWorker.controller.onstatechange();

            // Then:
                expect(mockServiceWorker.controller.postMessage).toHaveBeenCalledWith('some message');

        });

        it('should not send a message to the service worker when state has not changed', () => {

            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // And:
                mockServiceWorker.oncontrollerchange();

            // Then:
                expect(mockServiceWorker.controller.postMessage).not.toHaveBeenCalled();

        });

        it('should not send a message to the service worker when controller has not changed', () => {

            // Given:
                const mockServiceWorker = new MockServiceWorker();
                serviceWorkerStub.get.returns(mockServiceWorker);

            // And:
                const swTransport = getSWTransport(serviceWorkerStub);

            // When:
                swTransport.sendMessge('some message');

            // Then:
                expect(mockServiceWorker.controller.postMessage).not.toHaveBeenCalled();

        });
        
    });

    function getSWTransport(serviceWorkerStub, conf) {

        const SWTransport = injector({
            './service-worker': serviceWorkerStub
        });

        return new SWTransport.default(conf);
    }
});
