/* jshint esversion:6 */
const supertest = require('supertest');
const app = require('../app.js');

/**
 * Throws an error if obj doesn't meet the requirements of this app's returned
 * results. a valid json for this app: 1-is an array. 2-has 10 items. 3-each
 * item has four properties named: "url", "snippet", "thumbnail" and "context"
 *
 * @param obj {*} the object to run tests on. 
 */
function isValidJSON(obj) {
    if (!Array.isArray(obj)) {
        throw new Error("Expected the result to be an array. found: " + obj);
    }
    if (obj.length !== 10) {
        throw new Error("Expected to find 10 items, found " + obj.length);
    }
    obj.forEach((result, index) => {
        if (!result.hasOwnProperty("url")) {
            throw new Error("Expected the result at index " + index + " to have 'url' property.");
        }
        if (!result.hasOwnProperty("snippet")) {
            throw new Error("Expected the result at index " + index + " to have 'snippet' property.");
        }
        if (!result.hasOwnProperty("thumbnail")) {
            throw new Error("Expected the result at index " + index + " to have 'thumbnail' property.");
        }
        if (!result.hasOwnProperty("context")) {
            throw new Error("Expected the result at index " + index + " to have 'context' property.");
        }
    });
}

describe("Image Search API response", () => {
    it("returns a valid json if no offset is set", (done) => {
        supertest(app)
            .get("/api/imagesearch/programming")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                isValidJSON(res.body);
            })
            .end(done);
    });

    it("returns a valid json if an offset is set", (done) => {
        supertest(app)
            .get("/api/imagesearch/programming humour?offset=11")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                isValidJSON(res.body);
            })
            .end(done);
    });

    it("returns a valid json if an invalid offset is set", (done) => {
        supertest(app)
            .get("/api/imagesearch/westworld?offset=tuxitop")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                isValidJSON(res.body);
            })
            .end(done);
    });

    it("returns an error if the offset is bigger than 90", (done) => {
        supertest(app)
            .get("/api/imagesearch/westworld?offset=91")
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                if (!res.body.hasOwnProperty("error")) {
                    throw new Error("Expected to recieve an error if the offset is too much.");
                }
            })
            .end(done);
    });
});
