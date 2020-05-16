
const {resHelper} = require('../Helpers/ResponseHelper')
module.exports = class Order{

    async index(req,res){
        res.send(resHelper({}, "Hello, World!"),200)
    }

}


