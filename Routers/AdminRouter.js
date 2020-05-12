const route = require('express').Router()

const controller = require('../Controllers/AdminController')
const obj = new controller()

route.post('/', obj.create)
route.post('/login', obj.login)
module.exports = route