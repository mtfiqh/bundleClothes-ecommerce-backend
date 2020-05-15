const route = require('express').Router()

const controller = require('../Controllers/AddressController')
const obj = new controller()
const {checkToken} = new (require('../middleware/UserMiddleware'))()
// route.post('/', obj.index)
route.get('/self', checkToken ,obj.self)
module.exports = route