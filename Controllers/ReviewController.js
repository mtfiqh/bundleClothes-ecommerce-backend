const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Product'))()

module.exports = class Review{
    async index(req, res){
        const user_id = req.body.id
        
    }
}
