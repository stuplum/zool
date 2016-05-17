'use strict';

import Proxy from './proxy';
import {debug, error, info, warn} from '../logger';

let DEBUG = false;
let proxy;

self.addEventListener('install', () => {
    info('SW:installed');
    proxy = new Proxy();
});

self.addEventListener('activate', event => {
    info('SW:activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {

    if (event.data.debug) {
        DEBUG = true;
        proxy.setDebug(DEBUG);
    }

    if (DEBUG) {
        debug('SW:message:data', event.data);
    }

    event.data.resources.forEach(function (config) {
        if(!proxy) {
            error('Proxy not instantiated', config);
            return;
        }
        proxy.add(config.url, config.response);
    });
});

self.addEventListener('fetch', event => {

    const url = event.request.url;

    if (proxy) {

        const match = proxy.match(url);

        if (DEBUG) {
            debug('SW:fetch:url', url);
        }

        if (match) {

            if (DEBUG) {
                debug('SW:fetch:match', match);
            }

            event.respondWith(new Promise(function (resolve) {
                setTimeout(function () {

                    if (DEBUG) {
                        debug('SW:fetch:resolve', match.response);
                    }

                    resolve(match.response);
                }, match.delay);
            }));
        }
    } else {
        warn('SW:fetch', 'No proxy available for ' + url);
    }

});
