const route = require('express').Router()
const {checkToken} =new (require('../middleware/UserMiddleware'))()
const controller = require('../Controllers/UserController')
const obj = new controller()

route.post('/', obj.create)
route.post('/login', obj.login)
route.get('/self', checkToken ,obj.self)
route.post('/logout', checkToken ,obj.logout)
module.exports = route