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

export default SwIndicator;
