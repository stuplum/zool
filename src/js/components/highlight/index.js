'use strict';

import React from 'react';
import request from 'superagent';
import { highlightBlock } from 'highlight.js';

export default React.createClass({

    getInitialState() {
        return { src: '' };
    },

    componentDidMount() {

        this.serverRequest = request.get(this.props.source)
            .end((err, res) => {
                const lang = res.statusCode !== 200 ? 'html' : this.props.lang;
                this.setState({ lang, src: res.text });
            });
    },

    componentDidUpdate() {
        highlightBlock(this.refs.highlight);
    },

    componentWillUnmount() {
        this.serverRequest.abort();
    },

    render() {

        const language = `hljs lang-${this.state.lang}`;

        return (
            <pre ref="highlight" className={language}>
                <code>{this.state.src}</code>
            </pre>
        );
    }
});
