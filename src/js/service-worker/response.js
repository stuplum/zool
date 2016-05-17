'use strict';

function toString(thing) {
    return Object.prototype.toString.call(thing);
}

function isFunction(func) {
    return toString(func) == '[object Function]';
}

function isObject(obj) {
    return toString(obj) == '[object Object]';
}

function responseBody(resource) {

    let body = resource.body;

    if (isFunction(body)) {
        body = resource.body();
    }

    if (isObject(body)) {
        body = JSON.stringify(body);
    }

    return body ? body : '';
}

export function createResponse(resource) {

    const responseOptions = {
        status: resource.status || 200,
        headers: Object.assign({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }, resource.headers || {})
    };

    return new Response(responseBody(resource), responseOptions);
}
