'use strict';

// Iframe component
import iframeResizer from './iframe-resizer';

const iframe = document.querySelector('#example');

if (iframe) {
    iframe.onload = function () {
        iframeResizer(document.querySelector('#example'), 1000);
    };
}

import SwIndicator from './service-worker-indicator';

// SWIndicator component
if ('serviceWorker' in navigator) {

    const swIndicator = new SwIndicator(document.querySelector('#zool-l-menu'));

    swIndicator.loading();

    new Promise(function () {
        if (navigator.serviceWorker.controller) {
            return navigator.serviceWorker.ready.then(() => swIndicator.loaded());
        } else {
            return navigator.serviceWorker.register('/_sw.js').then(() => swIndicator.loaded());
        }
    })

        .catch(function(err) {
            console.error('ServiceWorker registration failed: ', err);
        });

}