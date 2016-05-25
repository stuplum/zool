'use strict';

import React from 'react';

import ExampleFrame from '../example-frame';

export default ({componentName, exampleId}) => (
    <div className="zool-component-frame">
        <ExampleFrame forComponent={componentName} exampleId={exampleId} />
    </div>
);
