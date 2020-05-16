const route = require('express').Router()

const controller = require('../Controllers/OrderController')
const obj = new controller()
const {checkToken} = new (require('../middleware/UserMiddleware'))()
const adminMiddleware = new (require('../middleware/AdminMiddleware'))()
const adminToken = adminMiddleware.checkToken
// route.post('/', obj.index)
route.post('/', checkToken ,obj.create)
route.get('/self', checkToken ,obj.self)
route.get('/self/process', checkToken ,obj.selfOnProcess)
route.get('/self/complete', checkToken ,obj.selfOnComplete)
route.post('/self/complete', checkToken ,obj.setToCompleteUserSide)
// admin
route.get('/', adminToken, obj.index)
route.get('/process', adminToken, obj.onProcess)
route.get('/complete', adminToken, obj.onComplete)
route.post('/setdelivery', adminToken, obj.changeToDelivery)
route.post('/setarrived', adminToken, obj.changeToArrived)
module.exports = route