'use strict';

function appendImgTo(location, src, alt) {

    const imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.alt = alt;
    imgEl.className = 'some-image';
    document.getElementById(location).appendChild(imgEl);

    return imgEl;
}

const somePingEl = appendImgTo('somePing', '/assets/img/some-ping.png', 'Some Ping');
const someOtherPingEl = appendImgTo('someOtherPing', '/assets/img/some-other-ping.png', 'Some Other Ping');

console.log('Some Ping', somePingEl);
console.log('Some Other Ping', someOtherPingEl);
