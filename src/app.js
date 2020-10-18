require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
//const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const app = express()

const helpRouter = require('./help/help-router')
const exampleRouter = require('./example/example-router')

const drinkRouter = require('./drink/drink-router')
const guardianRouter = require('./guardian/guardian-router')
const userRouter = require('./user/user-router')

const userdrinkRouter = require('./user_drink/user_drink-router')
const userguardianRouter = require('./user_guardian/user_guardian-router')

let whitelist = [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://guardian-ride-app.vercel.app',
    'https://guardian-ride-app.herokuapp.com']

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
}))

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = `The CORS policy for this origin doesn't ` +
                `allow access from the particular origin.`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.use(helmet())
//app.use(validateBearerToken)

app.use('/api/help', helpRouter)
app.use('/api/example', exampleRouter)

app.use('/api/drink', drinkRouter)
app.use('/api/guardian', guardianRouter)
app.use('/api/user', userRouter)

app.use('/api/user_drink', userdrinkRouter)
app.use('/api/user_guardian', userguardianRouter)

app.get('/', (req, res) => {
    res.send('Yippie!! Server Online in ' + NODE_ENV + ' mode!');
})

app.use(errorHandler)

module.exports = app