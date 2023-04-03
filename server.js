const express = require('express')
const server = express()
const path = require('path')

server.set('view engine', 'pug')
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.use('/calories', require('./routes/calories'))

server.get('/', (req, res) => {
    res.render('home')
})

server.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})