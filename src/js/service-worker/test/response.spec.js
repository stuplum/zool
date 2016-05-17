'use strict';

import {createResponse} from '../response';

describe('Response', () => {

    beforeEach(() => {

    });

    describe('createResponse', () => {

        it('should create a Response Object', () => {

            // When:
                const response = createResponse({});

            // Then:
                expect(response).toEqual(jasmine.any(Response));

        });

        it('should default to status code 200', () => {

            // When:
                const response = createResponse({});

            // Then:
                expect(response.status).toEqual(200);

        });

        it('should accept status code from resource', () => {

            // When:
                const response = createResponse({
                    status: 301
                });

            // Then:
                expect(response.status).toEqual(301);

        });

        it('should set access control and content type headers', () => {

            // When:
                const response = createResponse({});

            // Then:
                expect(response.headers.get('Access-Control-Allow-Origin')).toEqual('*');

            // And:
                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');

        });

        it('should set headers from resource', () => {

            // When:
                const response = createResponse({
                    headers: { 'Accept-Encoding': 'gzip' }
                });

            // Then:
                expect(response.headers.get('Accept-Encoding')).toEqual('gzip');

            // And:
                expect(response.headers.get('Access-Control-Allow-Origin')).toEqual('*');
                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');

        });

        it('should set body to an empty string', done => {

            // Given:
                const response = createResponse({});

            // When:
                const text = response.text();

            // Then:
                text.then(text => {
                    expect(text).toEqual('');
                    done();
                });

        });

        it('should set body to JSON string', done => {

            // Given:
                const response = createResponse({
                    body: { dave: 'chaz' }
                });

            // When:
                const text = response.text();

            // Then:
                text.then(text => {
                    expect(text).toEqual('{"dave":"chaz"}');
                    done();
                });

        });

        it('should set body to JSON string', done => {

            const DAVE = 'daaaave!';

            function dave() {
                return DAVE;
            }

            // Given:
                const response = createResponse({
                    body: () => { return dave(); }
                });

            // When:
                const text = response.text();

            // Then:
                text.then(text => {
                    expect(text).toEqual(DAVE);
                    done();
                });

        });

    });

});
