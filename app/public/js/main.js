'use strict';

function SwIndicator(parent) {
    this.swIndicator = document.createElement('span');
    parent.appendChild(this.swIndicator);
}

SwIndicator.prototype._setText = function (text) {
    this.swIndicator.innerHTML = text;
};

SwIndicator.prototype._setClassName = function (className) {
    this.swIndicator.className = 'zool-sw-indicator' +  ' ' + className;
};

SwIndicator.prototype.loading = function () {
    this._setText('Loading...');
    this._setClassName('is-loading');
};

SwIndicator.prototype.loaded = function () {
    this._setText('Loaded');
    this._setClassName('is-loaded');
};

if ('serviceWorker' in navigator) {

    const swIndicator = new SwIndicator(document.querySelector('#zool-l-menu'));

    swIndicator.loading();

    new Promise(function () {
        if (navigator.serviceWorker.controller) {
            return navigator.serviceWorker.ready.then(() => swIndicator.loaded());
        } else {
            return navigator.serviceWorker.register('/sw.js').then(() => swIndicator.loaded());
        }
    })

    .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });

}

function getIframeHeight(iframe, padding) {
    return iframe.contentWindow.document.body.scrollHeight + padding;
}

function iframeResizer(iframe, delay, padding) {

    padding = padding || 2;

    var initialHeight = getIframeHeight(iframe, padding);
    var currentHeight = initialHeight;

    iframe.style.height = initialHeight + 'px';

    var interval = setInterval(function () {

        var newHeight = getIframeHeight(iframe, padding);

        if (newHeight > initialHeight && newHeight !== (currentHeight + padding)) {
            iframe.style.height = newHeight + 'px';
            currentHeight = newHeight;
        }

    }, delay);

    return {
        stop: function () {
            clearInterval(interval);
        }
    }
}
