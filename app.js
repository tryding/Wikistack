const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const models = require('./models')
const user = require('./routes/user')
const wiki = require('./routes/wiki')
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"));

app.use('/user', user)
app.use('/wiki', wiki)

app.get('/', (req, res) => {
    res.send(layout(' '))
})

models.db.authenticate().
then(() => {
    console.log('connected to the database')
})

const init = async () => {
    await models.db.sync({force: true})
    app.listen(1337, () => {
        console.log('App listening')
    })
}

init();
