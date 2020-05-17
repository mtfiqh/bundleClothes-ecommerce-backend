const admin = new(require('../Models/Admin'))()
const {resHelper} = require('../Helpers/ResponseHelper')
module.exports = class AdminMiddleware{
    async checkToken(req, res, next){
        const token = req.headers.token
        if(token===undefined) return res.send(resHelper({}, "Token Invalid"), 403)
        let data = await admin.get({token:token})
        data=data[0]
        if(!data) return res.send(resHelper({}, "Token Invalid"), 403)
        if(token==data.token){
            req.body.id = data._id
            return next()
        }
        return res.send(resHelper({}, "Token Invalid"), 403)
    }
}