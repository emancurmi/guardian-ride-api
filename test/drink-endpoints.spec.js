const knex = require('knex')
const fixtures = require('./drink-fixtures')
const app = require('../src/app')

describe('Drink Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_drinks').truncate())

    afterEach('cleanup', () => db('tbl_drinks').truncate())

    describe('POST /api/drink', () => {
        it(`responds with 400 missing 'drinkname' if not supplied`, () => {
            const newDrinkMissingName= {
                //drinkname: "tequila",
                drinkalcoholvalue: 1
            }
            return supertest(app)
                .post(`/api/drink`)
                .send(newDrinkMissingName)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'drinkname' in request body` }
                })
        })

        it('adds a new drink to the store', () => {
            const newDrink = {
                drinkname: "tequila",
                drinkalcoholvalue: 1
            }
            return supertest(app)
                .post(`/api/drink`)
                .send(newDrink)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.drinkname).to.eql(newDrink.drinkname)
                    expect(res.body.drinkalcoholvalue).to.eql(newDrink.drinkalcoholvalue)

                    expect(res.body).to.have.property('drinkid')
                    expect(res.headers.location).to.eql(`/api/drink/${res.body.drinkid}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/drink/${res.body.drinkid}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })

    describe('GET /api/drink', () => {
        context(`Given no drink`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/drink')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are drinks in the database', () => {
            const testDrinks = fixtures.makeDrinksArray()
            const restultDrinks = fixtures.resultsDrinksArray();

            beforeEach('insert drinks', () => {
                return db
                    .into('tbl_drinks')
                    .insert(testDrinks)
            })

            it('gets the drinks from the store', () => {
                return supertest(app)
                    .get('/api/drink')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultDrinks)
            })
        })
    })

    describe('GET /api/drink/:drinkid', () => {
        context(`Given no drinks`, () => {
            it(`responds 404 when drink doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/drink/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Drink doesn't exist` }
                    })
            })
        })

        context('Given there are drinks in the database', () => {
            const testDrinks = fixtures.makeDrinksArray()
            const resultDrinks = fixtures.resultsDrinksArray()

            beforeEach('insert drinks', () => {
                return db
                    .into('tbl_drinks')
                    .insert(testDrinks)
            })

            it('responds with 200 and the specified drink', () => {
                const drinkId = 2
                const expectedDrink = resultDrinks[drinkId - 1]
                return supertest(app)
                    .get(`/api/drink/${drinkId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedDrink)
            })
        })
    })

    describe('DELETE /api/drink/:id', () => {

        context(`Given no drink`, () => {

            it(`responds 404 whe drink doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/drink/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Drink doesn't exist` }
                    })
            })
        })

        context('Given there are drinks in the database', () => {
            const testDrinks = fixtures.makeDrinksArray()
            const resultsDrinks = fixtures.resultsDrinksArray()

            beforeEach('insert drinks', () => {
                return db
                    .into('tbl_drinks')
                    .insert(testDrinks)
            })

            it('removes the drink by ID from the store', () => {
                const idToRemove = 2
                const expectedDrinks = resultsDrinks.filter(drink => drink.drinkid !== idToRemove)
                return supertest(app)
                    .delete(`/api/drink/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/drink/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedDrinks)
                    )
            })
        })
    })


})