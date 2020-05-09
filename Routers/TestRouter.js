const route = require('express').Router()

const controller = require('../Controllers/TestController')
const obj = new controller()

route.get('/', obj.index)

module.exports = route