'use strict';

import React from 'react';

import iframeResizer from '../../iframe-resizer';

import frameSrc from './frame-src';
import ExampleFramePopout from './example-frame-popout';

export default React.createClass({

    resizeIframe(ev) {
        this.resizer = iframeResizer(ev.target, 1000);
    },

    componentDidMount() {
        this.refs.exampleFrame.addEventListener('load', this.resizeIframe, true);
    },

    componentWillUnmount() {
        this.resizer.stop();
        this.refs.exampleFrame.removeEventListener('load', this.resizeIframe, true);
    },

    render() {
        return (
            <div>
                <ExampleFramePopout {...this.props}/>
                <iframe
                    ref="exampleFrame"
                    src={frameSrc(this.props.forComponent, this.props.exampleId)}
                    scrolling="no"></iframe>
            </div>
        );
    }
});
