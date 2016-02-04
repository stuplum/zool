'use strict';

module.exports = {
    addText: function (txt) {
        var topLevel = document.getElementById('topLevel');
        topLevel.appendChild(document.createTextNode(txt));
    }
};