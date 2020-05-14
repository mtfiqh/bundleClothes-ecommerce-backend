const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Cart'))()

module.exports = class Cart{
    async add(req, res){
        const user_id = req.body.id
        
    }
}