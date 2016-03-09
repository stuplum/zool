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
