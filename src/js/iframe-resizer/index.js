'use strict';

function getIframeHeight(iframe, padding) {
    return iframe.contentWindow.document.body.scrollHeight + padding;
}

export default (iframe, delay, padding) => {

    padding = padding || 2;

    const initialHeight = getIframeHeight(iframe, padding);

    let currentHeight = initialHeight;

    iframe.style.height = initialHeight + 'px';

    const interval = setInterval(function () {

        const newHeight = getIframeHeight(iframe, padding);

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
};
