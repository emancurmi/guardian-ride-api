const knex = require('knex')
const fixtures = require('./userguardian-fixtures')
const app = require('../src/app')

describe('User Guardian Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_user_guardians').truncate())

    afterEach('cleanup', () => db('tbl_user_guardians').truncate())

    //describe('POST /api/user_guardian', () => {
    //    it(`responds with 400 missing 'userid' if not supplied`, () => {
    //        const newUserGuardianMissingName = {
    //            //userid: 2,
    //            guardianid: 1
    //        }
    //        return supertest(app)
    //            .post(`/api/user_guardian`)
    //            .send(newUserGuardianMissingName)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `Missing 'userid' in request body` }
    //            })
    //    })

    //    it('adds a new user guardian to the store', () => {
    //        const newUserGuardian = {
    //            userid: 1,
    //            guardianid: 2
    //        }
    //        return supertest(app)
    //            .post(`/api/user_guardian`)
    //            .send(newUserGuardian)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(201)
    //            .expect(res => {
    //                expect(res.body.userid).to.eql(newUserGuardian.userid)
    //                expect(res.body.guardianid).to.eql(newUserGuardian.guardianid)

    //                expect(res.body).to.have.property('userguardiansid')
    //                expect(res.headers.location).to.eql(`/api/user_guardian/${res.body.userguardiansid}`)
    //            })
    //            .then(res =>
    //                supertest(app)
    //                    .get(`/api/user_guardian/${res.body.userguardiansid}`)
    //                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                    .expect(res.body)
    //            )
    //    })
    //})

    //describe('GET /api/user_guardian', () => {
    //    context(`Given no user guardian`, () => {

    //        it(`responds with 200 and an empty list`, () => {
    //            return supertest(app)
    //                .get('/api/user_guardian')
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(200, [])
    //        })
    //    })

    //    context('Given there are user guardian in the database', () => {
    //        const testUserGuardians = fixtures.makeUserGuardiansArray()
    //        const restultUserGuardians = fixtures.resultsUserGuardiansArray();

    //        beforeEach('insert user guardians', () => {
    //            return db
    //                .into('tbl_user_guardians')
    //                .insert(testUserGuardians)
    //        })

    //        it('gets the user guardians from the store', () => {
    //            return supertest(app)
    //                .get('/api/user_guardian')
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(200, restultUserGuardians)
    //        })
    //    })
    //})

    //describe('GET /api/user_guardian/:userguardiansid', () => {
    //    context(`Given no User Guardian`, () => {
    //        it(`responds 404 when user guardian link doesn't exist`, () => {
    //            return supertest(app)
    //                .get(`/api/user_guardian/123`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(404, {
    //                    error: { message: `User Guardian link doesn't exist` }
    //                })
    //        })
    //    })

    //    context('Given there are user guardian links in the database', () => {
    //        const testUserGuardians = fixtures.makeUserGuardiansArray()
    //        const restultUserGuardians = fixtures.resultsUserGuardiansArray()

    //        beforeEach('insert user guardians', () => {
    //            return db
    //                .into('tbl_user_guardians')
    //                .insert(testUserGuardians)
    //        })

    //        it('responds with 200 and the specified user guardian link', () => {
    //            const userguardiansId = 2
    //            const expectedUserGuardian = restultUserGuardians[userguardiansId - 1]
    //            return supertest(app)
    //                .get(`/api/user_guardian/${userguardiansId}`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(200, expectedUserGuardian)
    //        })
    //    })
    //})

    //describe('DELETE /api/user_guardian/:userguardiansid', () => {

    //    context(`Given no user guardian link`, () => {

    //        it(`responds 404 when user guardian link doesn't exist`, () => {
    //            return supertest(app)
    //                .delete(`/api/user_guardian/123`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(404, {
    //                    error: { message: `User Guardian link doesn't exist` }
    //                })
    //        })
    //    })

    //    context('Given there are user guardian links in the database', () => {
    //        const testUserGuardians = fixtures.makeUserGuardiansArray()
    //        const resultsUserGuardians = fixtures.resultsUserGuardiansArray()

    //        beforeEach('insert user guardian', () => {
    //            return db
    //                .into('tbl_user_guardians')
    //                .insert(testUserGuardians)
    //        })

    //        it('removes the drink by ID from the store', () => {
    //            const idToRemove = 2
    //            const expectedUserGuardian = resultsUserGuardians.filter(userguardian => userguardian.userguardiansid !== idToRemove)
    //            return supertest(app)
    //                .delete(`/api/user_guardian/${idToRemove}`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(204)
    //                .then(() =>
    //                    supertest(app)
    //                        .get(`/api/user_guardian/`)
    //                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                        .expect(expectedUserGuardian)
    //                )
    //        })
    //    })
    //})


})