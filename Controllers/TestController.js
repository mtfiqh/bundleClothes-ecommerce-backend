
const {resHelper} = require('../Helpers/ResponseHelper')
module.exports = class Test{

    async index(req,res){
        res.send(resHelper({}, "Hello, World!"),200)
    }

}


