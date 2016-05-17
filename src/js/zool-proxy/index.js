'use strict';

import SWTransport from './sw-transport';

export default {

    add(resource, debug) {

        const transport = new SWTransport({ debug: debug });

        const message = {
            debug: debug || false,
            resources: [resource]
        };

        if (debug) {
            console.debug('proxy:add', message);
        }

        transport.sendMessge(message);

    }
};
