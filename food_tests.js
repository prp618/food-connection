var request = require('supertest');

describe('loading express', function () {
    var server;

    beforeEach(function () {
        delete require.cache[require.resolve('../backend/server')];
        server = require('../backend/server');
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('Responds to /foods', function testSlash(done) {
        request(server)
            .get('/foods')
            .expect(200, done);
    });

    it('Errors on Null Food', function testPath(done) {
        request(server)
            .post('/foods/add')
            .send({food: {}})
            .expect(400, done);
    });

    it('Accepts valid food', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Rejects food without name', function testPath(done) {
        const testFood = {
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food with short name', function testPath(done) {
        const testFood = {
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food without restaurant', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food without calories', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food without protein', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food without fat', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food without carbs', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects food with string as calories', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: "ejbfesjihfbvhs",
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});
