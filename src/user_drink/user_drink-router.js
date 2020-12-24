const path = require('path')
const express = require('express')
const UserDrinkServices = require('./user_drink-services')

const userdrinkRouter = express.Router()
const jsonParser = express.json()

userdrinkRouter
    .route('/')
    .get((req, res, next) => {
        var quserid = req.query.userid || "";
        var qstart = req.query.start || "";

        console.log("starting user drink eval")

        if (quserid != "") {
            console.log("starting user eval")
            UserDrinkServices.getByUserId(req.app.get('db'), quserid)
                .then(userdrink => {
                    res.json(userdrink)
                })
                .catch(next)

            if (qstart != "") {
                console.log("starting user drink with date eval")
                UserDrinkServices.getTodaysDrinksByUserId(req.app.get('db'), quserid, qstart)
                    .then(userdrink => {
                        res.json(userdrink)
                    })
                    .catch(next)
            }
        }
        else {
            UserDrinkServices.getAllUserDrinks(req.app.get('db'))
                .then(userdrink => {
                    res.json(userdrink)
                })
                .catch(next)
        }
    })

    .post(jsonParser, (req, res, next) => {
        const { userid, drinkid, userdrinktime } = req.body
        const newUserDrink = { userid, drinkid, userdrinktime}

        for (const [key, value] of Object.entries(newUserDrink)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newUserDrink.userid = userid
        UserDrinkServices.insertUserDrink(
            req.app.get('db'),
            newUserDrink
        )
            .then(userdrink => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${userdrink.userdrinkid}`))
                    .json(userdrink)
            })
            .catch(next)
    })

userdrinkRouter

    .route('/:userdrinkid')

    .all((req, res, next) => {
        UserDrinkServices.getById(
            req.app.get('db'),
            req.params.userdrinkid
        )
            .then(userdrink => {
                if (!userdrink) {
                    return res.status(404).json({
                        error: { message: `User Drink doesn't exist` }
                    })
                }
                res.userdrink = userdrink
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            userdrinkid: res.userdrink.userdrinkid,
            userid: res.userdrink.userid,
            drinkid: res.userdrink.drinkid,
            userdrinktime: res.userdrink.userdrinktime
        })
    })

    .delete((req, res, next) => {
        UserDrinkServices.deleteUserDrink(
            req.app.get('db'),
            req.params.userdrinkid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { userid, drinkid, userdrinktime } = req.body
        const userDrinkToUpdate = { userid, drinkid, userdrinktime }
        const numberOfValues = Object.values(userDrinkToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        UserDrinkServices.updateUserDrink(
            req.app.get('db'),
            req.params.userdrinkid,
            userDrinkToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = userdrinkRouter