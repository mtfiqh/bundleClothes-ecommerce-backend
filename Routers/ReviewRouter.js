const route = require('express').Router()
const {checkToken} =new (require('../middleware/UserMiddleware'))()
const controller = require('../Controllers/ReviewController')
const obj = new controller()

route.get('/', checkToken ,obj.index)
route.post('/', checkToken, obj.rate)
module.exports = route