const knex = require('knex')
const fixtures = require('./user-fixtures')
const app = require('../src/app')

describe('User Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_users').truncate())

    afterEach('cleanup', () => db('tbl_users').truncate())

    describe('POST /api/user', () => {
        it(`responds with 400 missing 'username' if not supplied`, () => {
            const newUserMissingName = {
                //username: "tequila",
                userphone: "9172008007",
                userpin: 3330
            }
            return supertest(app)
                .post(`/api/user`)
                .send(newUserMissingName)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'username' in request body` }
                })
        })

        it(`responds with 400 missing 'userphone' if not supplied`, () => {
            const newUserMissingPhone = {
                username: "tequila",
                //userphone: "9172008007"
                userpin: 3330
            }
            return supertest(app)
                .post(`/api/user`)
                .send(newUserMissingPhone)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'userphone' in request body` }
                })
        })

        it(`responds with 400 missing 'userpin' if not supplied`, () => {
            const newUserMissingPin = {
                username: "tequila",
                userphone: "9172008007"
                //userpin: 3330
            }
            return supertest(app)
                .post(`/api/user`)
                .send(newUserMissingPin)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'userpin' in request body` }
                })
        })

        it('adds a new user to the store', () => {
            const newUser = {
                username: "tequila",
                userphone: "9172008007",
                userpin: 3330

            }
            return supertest(app)
                .post(`/api/user`)
                .send(newUser)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.username).to.eql(newUser.username)
                    expect(res.body.useralcoholvalue).to.eql(newUser.useralcoholvalue)

                    expect(res.body).to.have.property('userid')
                    expect(res.headers.location).to.eql(`/api/user/${res.body.userid}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/user/${res.body.userid}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })

    describe('GET /api/user', () => {
        context(`Given no user`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/user')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are users in the database', () => {
            const testUsers = fixtures.makeUsersArray()
            const restultUsers = fixtures.resultsUsersArray();

            beforeEach('insert users', () => {
                return db
                    .into('tbl_users')
                    .insert(testUsers)
            })

            it('gets the users from the store', () => {
                return supertest(app)
                    .get('/api/user')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultUsers)
            })
        })
    })

    describe('GET /api/user/:userid', () => {
        context(`Given no users`, () => {
            it(`responds 404 when user doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/user/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `User doesn't exist` }
                    })
            })
        })

        context('Given there are users in the database', () => {
            const testUsers = fixtures.makeUsersArray()
            const resultUsers = fixtures.resultsUsersArray()

            beforeEach('insert users', () => {
                return db
                    .into('tbl_users')
                    .insert(testUsers)
            })

            it('responds with 200 and the specified user', () => {
                const userId = 2
                const expectedUser = resultUsers[userId - 1]
                return supertest(app)
                    .get(`/api/user/${userId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedUser)
            })
        })
    })

    describe('DELETE /api/user/:id', () => {

        context(`Given no user`, () => {

            it(`responds 404 whe user doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/user/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `User doesn't exist` }
                    })
            })
        })

        context('Given there are users in the database', () => {
            const testUsers = fixtures.makeUsersArray()
            const resultsUsers = fixtures.resultsUsersArray()

            beforeEach('insert users', () => {
                return db
                    .into('tbl_users')
                    .insert(testUsers)
            })

            it('removes the user by ID from the store', () => {
                const idToRemove = 2
                const expectedUsers = resultsUsers.filter(user => user.userid !== idToRemove)
                return supertest(app)
                    .delete(`/api/user/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/user/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedUsers)
                    )
            })
        })
    })


})