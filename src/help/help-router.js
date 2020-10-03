const path = require('path')
const express = require('express')
const HelpService = require('./help-services')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {
        res.send('<h1>API Routes</h1></br>' +

            '<h2>Example Api</h2>' +
            '<p>' +
            '/api/example</br> ' +
            '/api/example/exampleid </br>' +
            '</p>' +

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

module.exports = helpRouter