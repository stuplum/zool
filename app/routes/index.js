'use strict';

module.exports = config => {
    return [
        require('./favicon.route')(config),
        require('./service-worker.route')(config),
        require('./static-assets.route')(config),
        require('./component.route')(config),
        require('./frame.route')(config)
    ];
};
