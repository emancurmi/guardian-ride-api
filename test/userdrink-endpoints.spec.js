const knex = require('knex')
const fixtures = require('./userdrink-fixtures')
const app = require('../src/app')

describe('User Drink Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_user_drinks').truncate())

    afterEach('cleanup', () => db('tbl_user_drinks').truncate())

    describe('POST /api/user_drink', () => {

        it(`responds with 400 missing 'userid' if not supplied`, () => {
            const newUserDrinkMissingUserId= {
                //userid: 2,
                drinkid: 1,
                userdrinktime: '2020-03-12 16:30:39'
            }
            return supertest(app)
                .post(`/api/user_drink`)
                .send(newUserDrinkMissingUserId)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'userid' in request body` }
                })
        })

        it('adds a new user drink to the store', () => {
            const newUserDrink = {
                userid: 2,
                drinkid: 1,
                userdrinktime: '2020-03-12 16:30:39'
            }
            return supertest(app)
                .post(`/api/user_drink`)
                .send(newUserDrink)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.userid).to.eql(newUserDrink.userid)
                    expect(res.body.drinkid).to.eql(newUserDrink.drinkid)
                    expect(res.body.userdrinktime).to.eql('2020-03-12T20:30:39.000Z')

                    expect(res.body).to.have.property('userdrinkid')
                    expect(res.headers.location).to.eql(`/api/user_drink/${res.body.userdrinkid}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/user_drink/${res.body.userdrinkid}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })

    describe('GET /api/user_drink', () => {
        context(`Given no drink`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/user_drink')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are drinks in the database', () => {
            const testUserDrinks = fixtures.makeUserDrinksArray()
            const restultUserDrinks = fixtures.resultsUserDrinksArray();

            beforeEach('insert drinks', () => {
                return db
                    .into('tbl_user_drinks')
                    .insert(testUserDrinks)
            })

            it('gets the drinks from the store', () => {
                return supertest(app)
                    .get('/api/user_drink')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultUserDrinks)
            })
        })
    })

    describe('GET /api/user_drink/:userdrinkid', () => {
        context(`Given no drinks`, () => {
            it(`responds 404 when user doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/user_drink/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `User Drink doesn't exist` }
                    })
            })
        })

        context('Given there are drinks in the database', () => {
            const testUserDrinks = fixtures.makeUserDrinksArray()
            const resultUserDrinks = fixtures.resultsUserDrinksArray()

            beforeEach('insert user drinks', () => {
                return db
                    .into('tbl_user_drinks')
                    .insert(testUserDrinks)
            })

            it('responds with 200 and the specified drink', () => {
                const userdrinkid = 2
                const expectedUserDrink = resultUserDrinks[userdrinkid - 1]
                return supertest(app)
                    .get(`/api/user_drink/${userdrinkid}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedUserDrink)
            })
        })
    })

    describe('DELETE /api/user_drink/:userdrinkid', () => {

        context(`Given no drink`, () => {

            it(`responds 404 whe user doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/user_drink/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `User Drink doesn't exist` }
                    })
            })
        })

        context('Given there are user drinks in the database', () => {
            const testUserDrinks = fixtures.makeUserDrinksArray()
            const resultsUserDrinks = fixtures.resultsUserDrinksArray()

            beforeEach('insert user drinks', () => {
                return db
                    .into('tbl_user_drinks')
                    .insert(testUserDrinks)
            })

            it('removes the drink by ID from the store', () => {
                const idToRemove = 2
                const expectedUserDrinks = resultsUserDrinks.filter(userdrink => userdrink.userdrinkid !== idToRemove)
                return supertest(app)
                    .delete(`/api/user_drink/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/user_drink/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedUserDrinks)
                    )
            })
        })
    })


})