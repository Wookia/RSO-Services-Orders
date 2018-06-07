let request = require('request');
const fs = require('fs');


describe('Menu api ', () => {
    const URL = 'http://localhost:3000';
    const API = '/api/menu';

    beforeAll((done) => {
        const myService = require("../../src/server.js");
        myService.startServer
            .then(() => {
                done();
            });
    }, 60000);

    function checkErrorAndResponse(error, response) {
        expect(error).toBe(null);
        expect(response.statusCode).toBe(200);
    }

    function checkBody(body, ref) {
        for (let key in ref) {
            expect(body[key]).toBeDefined();
            expect(body[key]).toBe(ref[key]);
        }
    }

    const sampleRequestBody = {
        group: 'GroupName',
        name: 'DishName',
        description: 'DishDescription',
        price: 1234567890
    };

    describe('GET ', () => {
        it('404 failure on /api/menu with misspell', (done) => {
            request.get(URL + API + '123', function (error, response, body) {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(404);

                expect(body).toContain("Error");
                expect(body).toContain("Cannot GET /api/menu123");

                done();
            });
        });

        it('successful /api/menu', (done) => {
            request.get(URL + API, (error, response, body) => {
                checkErrorAndResponse(error, response);

                expect(body).toContain("id");
                expect(body).toContain("group");
                expect(body).toContain("name");
                expect(body).toContain("description");
                expect(body).toContain("price");

                done();
            });
        });
    });

    function samplePOST(lambda) {
        request.post({
                url: URL + API,
                body: sampleRequestBody,
                json: true
            },
            (error, response, body) => lambda(error, response, body)
        );
    }

    describe('POST ', () => {
        it('successful POST /api/menu', (done) => {
            samplePOST((error, response, body) => {
                checkErrorAndResponse(error, response);
                checkBody(body, sampleRequestBody);
                done();
            });
        });
    });

    describe('PUT ', () => {
        it('successful /api/menu/ID', (done) => {
            samplePOST((error, response, body) => {
                checkErrorAndResponse(error, response);

                let putBody = Object.assign({}, sampleRequestBody);
                for (let key in putBody)
                    putBody[key] += 5;

                request.put({
                        url: URL + API + '/' + body.id,
                        body: putBody,
                        json: true
                    },
                    (error2, response2, body2) => {
                        checkErrorAndResponse(error2, response2);
                        putBody.id = body.id;
                        checkBody(body2, putBody);

                        done();
                    });
            });
        });
    });

    describe('DELETE ', () => {
        it('successful /api/menu/ID', (done) => {
            samplePOST((error, response, body) => {
                checkErrorAndResponse(error, response);
                checkBody(body, sampleRequestBody);

                request.delete(URL + API + '/' + body.id, (error2, response2, body2) => {
                    body2 = JSON.parse(body2);

                    checkErrorAndResponse(error2, response2);
                    checkBody(body2, body);

                    request.get(URL + API, (error3, response3, body3) => {
                        checkErrorAndResponse(error3, response3);

                        expect(body3).not.toContain('"id":' + body.id);
                        done();
                    });
                });
            });
        });
    });
});
