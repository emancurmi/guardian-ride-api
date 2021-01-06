const path = require('path')
const express = require('express')
const HelpService = require('./help-services')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {
        res.send('<h1>API Routes</h1></br>' +

            //'<h2>Example Api</h2>' +
            //'<p>' +
            //'/api/example</br> ' +
            //'/api/example/exampleid </br>' +
            //'</p>' +

            '<h2>Drinks Api</h2>' +
            '<p>' +
            '/api/drinks</br> ' +
            '/api/drinks/exampleid </br>' +
            '</p>' +

            '<h2>Users Api</h2>' +
            '<p>' +
            '/api/users</br> ' +
            '/api/users/exampleid </br>' +
            '</p>' +

            '<h2>Guardians Api</h2>' +
            '<p>' +
            '/api/guardians</br> ' +
            '/api/guardians/exampleid </br>' +
            '</p>' 
        );
    })


//    | Endpoint | What it does |
//| : ---------------------------: | : ----------------------------------------: |
//| /user                         | Returns an array of users                  |
//        | /user/{ id }                    | Returns the users by ID |
//| /user?userphone=""            | will check if user exist by phone number   |
//            | /user?userphone=""&userpin="" | will check if credentials exists           |
//            | /drink                        | Returns an array of drinks                 | 
//            | /drink{id}                    | Returns information about a specific drink |
//            | /guardian{id} | Returns guardian information
//            | /guardian_drink?userid="" | Returns guardian linked to user

module.exports = helpRouter