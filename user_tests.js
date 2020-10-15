var request = require('supertest');

/* Test User must exist in your test DB */

describe('loading express', function () {
    var server;

    beforeEach(function () {
        delete require.cache[require.resolve('../backend/server')];
        server = require('../backend/server');
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('Responds to /users', function testSlash(done) {
        request(server)
            .get('/users')
            .expect(200, done);
    });

    it('Errors on Null User', function testPath(done) {
        request(server)
            .post('/users/add')
            .send({})
            .expect(400, done);
    });

    it('Accepts valid login', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser"
        }
        request(server)
            .post('/users/login')
            .send(testUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Rejects short password', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestU",
            
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects short username', function testPath(done) {
        const testUser = {
            username: "Te",
            email: "TestUser",
            password: "TestUser",
            
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Accepts valid change', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser" + Date.now(),
            password: "TestUser",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Rejects string age', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: "cool",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects string height', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: "cool",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects string weight', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: 70,
            weight: "heavy",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects negative weight', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: 70,
            weight: -10,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects negative height', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: -1,
            weight: 150,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Rejects negative age', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: -10,
            height: 70,
            weight: 150,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});
