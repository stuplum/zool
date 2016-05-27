'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/example-tabs/example';
import ExampleTabs from './components/example-tabs';
import Highlighter from './components/highlighter';

const initialData = JSON.parse(document.getElementById('initialData').innerHTML);

const example = document.getElementById('example');
const exampleTabs = document.getElementById('exampleTabs');
const highlightCss = document.getElementById('highlightCss');
const highlightJs = document.getElementById('highlightJs');

if (example) {
    ReactDOM.render(<Example {...initialData.example}/>, example);
}

if (exampleTabs) {
    ReactDOM.render(<ExampleTabs {...initialData.example}/>, exampleTabs);
}

if (highlightCss) {
    ReactDOM.render(<Highlighter componentName={initialData.example.componentName} lang="css" />, highlightCss);
}

if (highlightJs) {
    ReactDOM.render(<Highlighter componentName={initialData.example.componentName} lang="js" />, highlightJs);
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