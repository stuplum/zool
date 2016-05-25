'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/example-tabs/example';
import ExampleTabs from './components/example-tabs';

const initialData = JSON.parse(document.getElementById('initialData').innerHTML);
const example = document.getElementById('example');
const exampleTabs = document.getElementById('exampleTabs');

if (example) {
    ReactDOM.render(<Example {...initialData.example}/>, example);
}
if (exampleTabs) {
    ReactDOM.render(<ExampleTabs {...initialData.example}/>, exampleTabs);
}


import SwIndicator from './service-worker-indicator';

// SWIndicator component
if ('serviceWorker' in navigator) {

    const swIndicator = new SwIndicator(document.querySelector('#zool-l-menu'));

    swIndicator.loading();

    new Promise(function () {
        if (navigator.serviceWorker.controller) {
            return navigator.serviceWorker.ready.then(() => swIndicator.loaded());
        } else {
            return navigator.serviceWorker.register('/_sw.js').then(() => swIndicator.loaded());
        }
    })

        .catch(function(err) {
            console.error('ServiceWorker registration failed: ', err);
        });

}