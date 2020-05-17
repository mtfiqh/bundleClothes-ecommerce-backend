const route = require('express').Router()

const controller = require('../Controllers/AdminController')
const obj = new controller()
const {checkToken} = new (require('../middleware/AdminMiddleware'))()
route.post('/', obj.create)
route.post('/login', obj.login)
route.post('/logout', checkToken, obj.logout)
route.get('/self', checkToken, obj.self)
module.exports = route