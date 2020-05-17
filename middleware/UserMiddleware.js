const model = new(require('../Models/User'))()
const {resHelper} = require('../Helpers/ResponseHelper')
module.exports = class UserMiddleware{
    async checkToken(req, res, next){
        const token = req.headers.token
        if(token===undefined) return res.send(resHelper({}, "Token Invalid"), 403)
        let data = await model.get({token:token})
        data=data[0]
        if(!data) return res.send(resHelper({}, "Token Invalid"), 403)
        if(token==data.token){
            req.body.id = data._id
            return next()
        }
        return res.send(resHelper({}, "Token Invalid"), 403)
    }
}