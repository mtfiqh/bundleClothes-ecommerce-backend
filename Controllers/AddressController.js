const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Address'))()

module.exports = class Address{
    async index(req, res){
        
    }
    async create(req, res){

    }
    async update(req, res){

    }
    async delete(req, res){
    }
    async read(req, res){

    }
    async self(req, res){
        const id = req.body.id
        let addresses = await model.get({user_id:id})
        if(Object.keys(addresses).length<1){
            await model.insert({user_id:id})
            addresses = await model.get({user_id:id})
        }
        return res.status(200).send(resHelper(addresses, "Address of user fetched"))
    }
}