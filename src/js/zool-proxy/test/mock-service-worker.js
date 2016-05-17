'use strict';

export default class MockServiceWorker {

    constructor() {
        this.controller = { postMessage: sinon.stub() };
        this.ready = { then: sinon.stub() };
    }
};
