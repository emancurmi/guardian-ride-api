const path = require('path')
const express = require('express')
const DrinkServices = require('./drink-services')

const drinkRouter = express.Router()
const jsonParser = express.json()

drinkRouter
    .route('/')
    .get((req, res, next) => {
        DrinkServices.getAllDrinks(req.app.get('db'))
            .then(drinks => {
                res.json(drinks)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { drinkname, drinkalcoholvalue } = req.body
        const newDrink = { drinkname, drinkalcoholvalue }

        console.log(newDrink);

        for (const [key, value] of Object.entries(newDrink)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newDrink.drinkname = drinkname
        DrinkServices.insertDrink(
            req.app.get('db'),
            newDrink
        )
            .then(drink => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${drink.drinkid}`))
                    .json(drink)
            })
            .catch(next)
    })

drinkRouter

    .route('/:drinkid')

    .all((req, res, next) => {
        DrinkServices.getById(
            req.app.get('db'),
            req.params.drinkid
        )
            .then(drink => {
                if (!drink) {
                    return res.status(404).json({
                        error: { message: `Drink doesn't exist` }
                    })
                }
                res.drink = drink
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            drinkid: res.drink.drinkid,
            drinkname: res.drink.drinkname,
            drinkalcoholvalue: res.drink.drinkalcoholvalue
        })
    })

    .delete((req, res, next) => {
        DrinkServices.deleteDrink(
            req.app.get('db'),
            req.params.drinkid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { drinkname, drinkalcoholvalue } = req.body
        const drinkToUpdate = { drinkname, drinkalcoholvalue }
        const numberOfValues = Object.values(drinkToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        DrinkServices.updateDrink(
            req.app.get('db'),
            req.params.drinkid,
            drinkToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = drinkRouter