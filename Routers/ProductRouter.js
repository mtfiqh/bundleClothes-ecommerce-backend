const route = require('express').Router()

const controller = require('../Controllers/ProductControler')
const obj = new controller()
const {checkToken} = new (require('../middleware/AdminMiddleware'))()

const multer = require('multer')
const storage = multer.diskStorage({
    destination:'./public/products',
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

route.post('/', upload.array('images', 4), checkToken, obj.create)
route.get('/', obj.index)

module.exports = route