/* jshint esversion:6 */
const supertest = require('supertest');
const app = require('../app.js');

describe("homepage response", () => {
    it("renders the homepage", (done) => {
        supertest(app)
            .get("/")
            .expect("content-type", /html/)
            .expect(200)
            .end(done);
    });
});
