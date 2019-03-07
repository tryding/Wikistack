const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { db } = require('./models')
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.send(layout(' '))
})

db.authenticate().
then(() => {
    console.log('connected to the database')
})

app.listen(1337, () => {
    console.log('App listening')
})