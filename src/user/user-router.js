const path = require('path')
const express = require('express')
const UserServices = require('./user-services')

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
    .route('/')
    .get((req, res, next) => {
        var quserphone = req.query.userphone || "";
        var quserpin = req.query.userpin || "";

        if (quserphone != "") {
            if (quserpin != "") {
                UserServices.getByUserPhone(req.app.get('db'), quserphone, quserpin)
                    .then(users => {
                        res.json(users)
                    })
                    .catch(next)
            }
            else {
                throw Error("Pin is rquired");
            }
        }
        else {
            UserServices.getAllUsers(req.app.get('db'))
                .then(users => {
                    res.json(users)
                })
                .catch(next)
        }
    })

    .post(jsonParser, (req, res, next) => {
        const { username, userphone, userpin } = req.body
        const newUser = { username, userphone, userpin }

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        const founduser = null;
        UserServices.getByUserPhoneOnly(req.app.get('db'), newUser.userphone)
            .then(users => {
                this.founduser = users;
            })
        console.log(founduser);
        if (founduser === null) {
            UserServices.insertUser(req.app.get('db'), newUser)
                .then(user => {
                    res
                        .status(201)
                        .location(path.posix.join(req.originalUrl + `/${user.userid}`))
                        .json(user)
                })
                .catch(next)
        }
        else {
            throw Error("User is already registered!");
        }
    })

userRouter

    .route('/:userid')

    .all((req, res, next) => {
        UserServices.getById(
            req.app.get('db'),
            req.params.userid
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            userid: res.user.userid,
            username: res.user.username,
            userphone: res.user.userphone,
            userpin:res.user.userpin
        })
    })

    .delete((req, res, next) => {
        UserServices.deleteUser(
            req.app.get('db'),
            req.params.userid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch((req, res, next) => {
        const { username, userphone, userpin } = req.body
        const userToUpdate = { username, userphone, userpin }
        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        UserServices.updateUser(
            req.app.get('db'),
            req.params.userid,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(200).json({})
            })
            .catch(next)
    })

module.exports = userRouter