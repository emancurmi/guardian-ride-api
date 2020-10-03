const path = require('path')
const express = require('express')
const GuardianServices = require('./guardian-services')

const guardianRouter = express.Router()
const jsonParser = express.json()

guardianRouter
    .route('/')
    .get((req, res, next) => {
        GuardianServices.getAllGuardians(req.app.get('db'))
            .then(guardian => {
                res.json(guardian)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { guardianname, guardianphone } = req.body
        const newGuardian = { guardianname, guardianphone }

        for (const [key, value] of Object.entries(newGuardian)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newGuardian.guardianname = guardianname
        GuardianServices.insertGuardian(
            req.app.get('db'),
            newGuardian
        )
            .then(guardian => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${guardian.guardianid}`))
                    .json(guardian)
            })
            .catch(next)
    })

guardianRouter

    .route('/:guardianid')

    .all((req, res, next) => {
        GuardianServices.getById(
            req.app.get('db'),
            req.params.guardianid
        )
            .then(guardian => {
                if (!guardian) {
                    return res.status(404).json({
                        error: { message: `Guardian doesn't exist` }
                    })
                }
                res.guardian = guardian
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            guardianid: res.guardian.guardianid,
            guardianname: res.guardian.guardianname,
            guardianphone: res.guardian.guardianphone
        })
    })

    .delete((req, res, next) => {
        GuardianServices.deleteGuardian(
            req.app.get('db'),
            req.params.guardianid
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { guardianname, guardianphone } = req.body
        const guardianToUpdate = { guardianname, guardianphone }
        const numberOfValues = Object.values(guardianToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        GuardianServices.updateGuardian(
            req.app.get('db'),
            req.params.guardianid,
            guardianToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = guardianRouter