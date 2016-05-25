'use strict';

export default function (name, exampleId) {
    if (exampleId) {
        return `/frame/${name}?exampleId=${exampleId}`;
    } else {
        return `/frame/${name}`;
    }
};
