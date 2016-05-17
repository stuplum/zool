'use strict';

import {debug, error} from '../logger';

export default {
    get(debugEnabled) {

        if (!'serviceWorker' in navigator) {
            error('ServiceWorker', 'Unsupported');
        }

        if (debugEnabled) {
            debug('ServiceWorker', 'Supported');
        }

        return navigator.serviceWorker;
    }
};
