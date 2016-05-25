'use strict';

import React from 'react';

import frameSrc from './frame-src';

export default React.createClass({

    render() {

        const forComponent = this.props.forComponent;
        const exampleId = this.props.exampleId;

        function title() {
            return `Open ${forComponent} in a new tab`;
        }

        return (
            <a className="zool-component-frame__new-tab"
               href={frameSrc(forComponent, exampleId)}
               target="_blank"
               title={title()}>
                <img src="/_assets/img/new-tab.gif" alt={title()} />
            </a>
        );
    }
});
