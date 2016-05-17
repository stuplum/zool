'use strict';

import serviceWorker from './service-worker';
import {debug} from '../logger';

export default class SWTransport {

    constructor(conf = {}) {

        this.debug = Boolean(conf.debug);

        this.sw = serviceWorker.get(this.debug);

        if (this.debug) {
            debug('SWTransport:constructor', this);
        }
    }

    _postMessage(message, type) {

        if (this.debug) {
            debug(`SWTransport:${type}`, message);
        }

        this.sw.controller.postMessage(message);
    }

    _sendMessageWhenReady(message) {
        this.sw.ready.then(reg => {
            if (reg.active.state === 'activated') {
                this._postMessage(message, '_sendMessageWhenReady');
            }
        });
    }

    _sendMessageWhenChange(message) {
        this.sw.oncontrollerchange = () => {
            this.sw.controller.onstatechange = () => {
                this._postMessage(message, '_sendMessageWhenChange');
            };
        };
    }

    sendMessge(message) {
        this._sendMessageWhenReady(message);
        this._sendMessageWhenChange(message);
    }
}
