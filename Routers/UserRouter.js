const route = require('express').Router()
const {checkToken} =new (require('../middleware/UserMiddleware'))()
const controller = require('../Controllers/UserController')
const obj = new controller()

const multer = require('multer')
const storage = multer.diskStorage({
    destination:'./public/users',
    filename:function(req, file, cb){
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})
const upload = multer({
    storage:storage,
    fileFilter:(req, file, cb)=>{
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg") cb(null, true)
        else cb(null, false)

    }
})


route.post('/', obj.create)
route.post('/login', obj.login)
route.get('/self', checkToken ,obj.self)
route.post('/logout', checkToken ,obj.logout)
route.put('/self', checkToken, upload.single('avatar'), obj.update)
module.exports = route