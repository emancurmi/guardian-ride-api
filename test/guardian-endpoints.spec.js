const knex = require('knex')
const fixtures = require('./guardian-fixtures')
const app = require('../src/app')

describe('Guardian Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_guardians').truncate())

    afterEach('cleanup', () => db('tbl_guardians').truncate())

    describe('POST /api/guardian', () => {
        it(`responds with 400 missing 'guardianname' if not supplied`, () => {
            const newGuardianMissingName = {
                //guardianname: "tequila",
                guardianphone:"9172008007"
            }
            return supertest(app)
                .post(`/api/guardian`)
                .send(newGuardianMissingName)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'guardianname' in request body` }
                })
        })

        it(`responds with 400 missing 'guardianphone' if not supplied`, () => {
            const newGuardianMissingName = {
                guardianname: "tequila"
                //guardianphone: 9172008007
            }
            return supertest(app)
                .post(`/api/guardian`)
                .send(newGuardianMissingName)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'guardianphone' in request body` }
                })
        })

        it('adds a new guardian to the store', () => {
            const newGuardian = {
                guardianname: "tequila",
                guardianphone: "9172008007"
            }
            return supertest(app)
                .post(`/api/guardian`)
                .send(newGuardian)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.guardianname).to.eql(newGuardian.guardianname)
                    expect(res.body.guardianphone).to.eql(newGuardian.guardianphone)

                    expect(res.body).to.have.property('guardianid')
                    expect(res.headers.location).to.eql(`/api/guardian/${res.body.guardianid}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/guardian/${res.body.guardianid}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })

    describe('GET /api/guardian', () => {
        context(`Given no guardian`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/guardian')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are guardians in the database', () => {
            const testGuardians = fixtures.makeGuardiansArray()
            const restultGuardians = fixtures.resultsGuardiansArray();

            beforeEach('insert guardians', () => {
                return db
                    .into('tbl_guardians')
                    .insert(testGuardians)
            })

            it('gets the guardians from the store', () => {
                return supertest(app)
                    .get('/api/guardian')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultGuardians)
            })
        })
    })

    describe('GET /api/guardian/:guardianid', () => {
        context(`Given no guardians`, () => {
            it(`responds 404 when guardian doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/guardian/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Guardian doesn't exist` }
                    })
            })
        })

        context('Given there are guardians in the database', () => {
            const testGuardians = fixtures.makeGuardiansArray()
            const resultGuardians = fixtures.resultsGuardiansArray()

            beforeEach('insert guardians', () => {
                return db
                    .into('tbl_guardians')
                    .insert(testGuardians)
            })

            it('responds with 200 and the specified guardian', () => {
                const guardianId = 2
                const expectedGuardian = resultGuardians[guardianId - 1]
                return supertest(app)
                    .get(`/api/guardian/${guardianId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedGuardian)
            })
        })
    })

    describe('DELETE /api/guardian/:id', () => {

        context(`Given no guardian`, () => {

            it(`responds 404 whe guardian doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/guardian/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Guardian doesn't exist` }
                    })
            })
        })

        context('Given there are guardians in the database', () => {
            const testGuardians = fixtures.makeGuardiansArray()
            const resultsGuardians = fixtures.resultsGuardiansArray()

            beforeEach('insert guardians', () => {
                return db
                    .into('tbl_guardians')
                    .insert(testGuardians)
            })

            it('removes the guardian by ID from the store', () => {
                const idToRemove = 2
                const expectedGuardians = resultsGuardians.filter(guardian => guardian.guardianid !== idToRemove)
                return supertest(app)
                    .delete(`/api/guardian/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/guardian/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedGuardians)
                    )
            })
        })
    })


})