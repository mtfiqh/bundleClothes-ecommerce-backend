const route = require('express').Router()
const {checkToken} =new (require('../middleware/UserMiddleware'))()
const controller = require('../Controllers/CartController')
const obj = new controller()

route.post('/', checkToken, obj.add)
route.delete('/', checkToken, obj.min)
route.get('/', checkToken, obj.self)
module.exports = route