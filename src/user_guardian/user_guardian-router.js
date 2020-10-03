const path = require('path')
const express = require('express')
const UserGuardianServices = require('./user_guardian-services')

const userguardianRouter = express.Router()
const jsonParser = express.json()

userguardianRouter
    .route('/')
    .get((req, res, next) => {
        UserGuardianServices.getAllUserGuardians(req.app.get('db'))
            .then(userguardians => {
                res.json(userguardians)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { userid, guardianid } = req.body
        const newUserGuardian = { userid, guardianid }

        for (const [key, value] of Object.entries(newUserGuardian)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newUserGuardian.userid = userid
        UserGuardianServices.insertUserGuardian(
            req.app.get('db'),
            newUserGuardian
        )
            .then(userguardian => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${userguardian.userguardianid}`))
                    .json(userguardian)
            })
            .catch(next)
    })

userguardianRouter

    .route('/:userguardianid')

    .all((req, res, next) => {
        UserGuardianServices.getById(
            req.app.get('db'),
            req.params.userguardianid
        )
            .then(userguardian => {
                if (!userguardian) {
                    return res.status(404).json({
                        error: { message: `User Guardian link doesn't exist` }
                    })
                }
                res.userguardian = userguardian
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            userguardianid: res.userguardian.userguardianid,
            userid: res.userguardian.userid,
            guardianid: res.userguardian.guardianid
        })
    })

    .delete((req, res, next) => {
        UserGuardianServices.deleteUserGuardian(
            req.app.get('db'),
            req.params.userguardianid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { userid, guardianid } = req.body
        const userguardianToUpdate = { userid, guardianid }
        const numberOfValues = Object.values(userguardianToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        UserGuardianServices.updateUserGuardian(
            req.app.get('db'),
            req.params.userguardianid,
            userguardianToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = userguardianRouter