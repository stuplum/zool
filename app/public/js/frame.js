'use strict';

var ZOOL = ZOOL || {};

ZOOL.proxy = {

    add: function (resource) {

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.oncontrollerchange = () => {
                navigator.serviceWorker.controller.onstatechange = function () {
                    this.postMessage([resource]);
                };
            };

        } else {
            console.log('ServiceWorker unsupported');
        }

    }
};
