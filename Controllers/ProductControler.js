const model = new (require('../Models/Product'))()
const {resHelper} = require('../Helpers/ResponseHelper')

module.exports = class Product{

    async index(req,res){
        let data = await model.get()
        if(Object.keys(data).length<1) return res.send(resHelper({}, "Product Empty"),404)
        return res.send(resHelper(data, "All products fetched"),200)
    }

    async create(req, res){
        console.log(req)
    }

}