'use strict';

export function log() {
    console.log.apply(console, arguments);
}

export function debug() {
    console.debug.apply(console, arguments);
}

export function error() {
    console.error.apply(console, arguments);
}

export function info() {
    console.info.apply(console, arguments);
}

export function warn() {
    console.warn.apply(console, arguments);
}
