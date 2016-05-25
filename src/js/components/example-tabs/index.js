'use strict';

import React from 'react';

import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import Example from './example';

export default React.createClass({

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },

    render() {
        return (
            <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                <TabList>
                    { this.props.examples.map(example => <Tab key={example}>{example}</Tab>) }
                </TabList>
                { this.props.examples.map(example =>
                    <TabPanel key={example}>
                        <Example componentName={this.props.componentName} exampleId={example} />
                    </TabPanel>
                ) }
            </Tabs>
        );
    }
});
