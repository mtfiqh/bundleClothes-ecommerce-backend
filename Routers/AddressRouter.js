const route = require('express').Router()

const controller = require('../Controllers/AddressController')
const obj = new controller()
const {checkToken} = new (require('../middleware/UserMiddleware'))()
// route.post('/', obj.index)
route.get('/self', checkToken ,obj.self)
route.post('/', checkToken ,obj.create)
route.put('/:address_id', checkToken ,obj.update)
route.delete('/:address_id', checkToken, obj.delete)
route.get('/:address_id', checkToken, obj.read)
module.exports = route