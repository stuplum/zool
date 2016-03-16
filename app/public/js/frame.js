'use strict';

var ZOOL = ZOOL || {};

ZOOL.proxy = {

    add: function (resource, debug) {

        const message = {
            debug: debug || false,
            resources: [resource]
        };

        if (debug) {
            console.log('proxy:add', message);
        }

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.oncontrollerchange = () => {

                if (debug) {
                    console.log('service worker controller change');
                }

                navigator.serviceWorker.controller.onstatechange = function () {

                    if (debug) {
                        console.log('controller state changed');
                    }

                    this.postMessage(message);
                };
            };

        } else {
            console.log('ServiceWorker unsupported');
        }

    }
};
