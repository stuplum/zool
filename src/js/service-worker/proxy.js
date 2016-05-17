'use strict';

import {debug} from '../logger';
import {createResponse} from './response';

export default class Proxy {

    constructor() {
        this.resources = {};
        this.debug = false;
    }

    setDebug(debug) {
        this.debug = debug;
    }

    add(url, response) {

        if (this.debug) {
            debug('SW:proxy:add', url, response);
        }

        this.resources[url] = response;
    }

    match(url) {

        url = decodeURIComponent(url);

        const resource = this.resources[url];

        return resource ? { response: createResponse(resource), delay: resource.delay || 0 } : null;
    }

    clear() {
        throw 'Not implemented';
    }

    clearAll() {
        throw 'Not implemented';
    }
};
