'use strict';

class Proxy {

    constructor() {
        this.resources = {};
    }

    _createResponse(resource) {

        const responseOptions = {
            status: resource.status || 200,
            headers: Object.assign({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
            }, resource.headers || {})
        };

        const responseBody = resource.body ? JSON.stringify(resource.body) : '';

        return new Response(responseBody, responseOptions);
    }

    add(url, response) {
        this.resources[url] = response;
    }

    match(url) {

        url = decodeURIComponent(url);

        const resource = this.resources[url];

        return resource ? { response: this._createResponse(resource), delay: resource.delay || 0 } : null;
    }

    clear() {
        throw 'Not implemented';
    }

    clearAll() {
        throw 'Not implemented';
    }
}

let proxy;

self.addEventListener('install', () => {
    proxy = new Proxy();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
    event.data.forEach(function (config) {
        proxy.add(config.url, config.response);
    });
});

self.addEventListener('fetch', event => {

    const url = event.request.url;
    const match = proxy.match(url);

    if (match) {
        event.respondWith(new Promise(function (resolve) {
            setTimeout(function () {
                resolve(match.response);
            }, match.delay);
        }));
    }

});
