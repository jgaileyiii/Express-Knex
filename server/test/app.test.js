const request = require('supertest')
const expect = require('chai').expect
const knex = require('../db/knex')

const fixtures = require('./fixtures')

const app = require('../app')

describe('CRUD Teachers', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run()
        }).then(() => done())
    })

    it('Lists all Records', (done) => {
        request(app)
        .get('/api/v1/teachers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('array')
            expect(response.body).to.deep.equal(fixtures.teachers)
            done()
        })
    })
    it('Show one record by id', (done) => {
        request(app)
        .get('/api/v1/teachers/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('object')
            expect(response.body).to.deep.equal(fixtures.teachers[0])
            done()
        })
    })
    it('Show one record by id', (done) => {
        request(app)
        .get('/api/v1/teachers/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('object')
            expect(response.body).to.deep.equal(fixtures.teachers[2])
            done()
        })
    })
    it('Creates a record', (done) => {
        request(app)
            .post('/api/v1/teachers')
            .send(fixtures.teacher)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.teacher.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.teacher)
                done()
            })
    })
    it('Updates a record', (done) => {
        fixtures.teacher.url = 'https://www.yelp.com'
        request(app)
            .put('/api/v1/teachers/25')
            .send(fixtures.teacher)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.teacher)
                done()
        })
            
    })
    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/v1/teachers/25')
            .send(fixtures.teacher)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal({
                    deleted: true
                })
                done()
        })
            
    })
})