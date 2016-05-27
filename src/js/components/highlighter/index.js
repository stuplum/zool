'use strict';

import React from 'react';

import Highlight from '../highlight';

export default React.createClass({

    getSource() {
        return `/${this.props.lang}/${this.props.componentName}.${this.props.lang}`;
    },

    render() {
        return (
            <Highlight source={this.getSource()} lang={this.props.lang} />
        );
    }
});
