const route = require('express').Router()
const {checkToken} =new (require('../middleware/UserMiddleware'))()
const controller = require('../Controllers/CartController')
const obj = new controller()

route.post('/add', checkToken, obj.add)
route.delete('/min', checkToken, obj.min)
route.get('/self', checkToken, obj.self)
module.exports = route