require('dotenv').config()
const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

const routesPerson = require('./routes/routesPerson')
app.use('/person', routesPerson)

const URL_CONECTION = process.env.URL_CONECTION;

mongoose.connect(
    URL_CONECTION
).then(() => {
    console.log('MongoDB is conected!')
})
.catch((err) => console.log(err))

app.listen(3000)