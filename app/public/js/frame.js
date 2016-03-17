'use strict';

var ZOOL = ZOOL || {};

function postMessage(message) {
    navigator.serviceWorker.controller.postMessage(message);
}

ZOOL.proxy = {

    add: function (resource, debug) {

        const message = {
            debug: debug || false,
            resources: [resource]
        };

        if (debug) {
            console.debug('proxy:add', message);
        }

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.ready.then(function (reg) {

                if (debug) {
                    console.debug('proxy:ready', message);
                }

                if (reg.active.state === 'activated') {

                    if (debug) {
                        console.debug('proxy:ready:activated', message);
                    }

                    postMessage(message);
                }
            });

            navigator.serviceWorker.oncontrollerchange = () => {

                if (debug) {
                    console.debug('proxy:controllerchange');
                }

                navigator.serviceWorker.controller.onstatechange = function () {

                    if (debug) {
                        console.debug('proxy:statechange');
                    }

                    postMessage(message);
                };
            };

        } else {
            console.error('proxy:error', 'ServiceWorker unsupported');
        }

    }
};
