const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Address'))()

module.exports = class Address{
    async index(req, res){
        
    }
    async create(req, res){
        let payload = {}
        let data = {errors:{}}
        payload.user_id = req.body.id
        payload.address = []
        let temp = {}
        req.body.address ? temp.address = req.body.address : data.errors.address="required"
        req.body.postal_code ? temp.postal_code = req.body.postal_code : data.errors.postal_code="required"
        req.body.recipient ? temp.recipient = req.body.recipient : data.errors.recipient = "required"
        req.body.phone_number ? temp.phone_number = req.body.phone_number : data.errors.phone_number = "required"
        payload.address.push(temp)

        if(Object.keys(data.errors).length>0) return res.status(400).send(resHelper(data, "Missing required parameters"))
        
        let addresses = await model.get({user_id:payload.user_id})
        if(Object.keys(addresses).length<1){
            await model.insert({user_id:id})
            addresses = await model.get({user_id:payload.user_id})
        }
        let address = addresses[0]
        // console.log('address', address)
        address.address.forEach(x=>{
            temp = {
                address:x.address,
                postal_code:x.postal_code,
                recipient:x.recipient,
                phone_number:x.phone_number
            }
            payload.address.push(temp)
        })
        // console.log('payload', payload)
        await model.update({user_id:payload.user_id}, {address:payload.address})
        address = await model.get({_id:address._id})
        address=address[0]
        return res.status(201).send(resHelper(address, "Address inserted"))
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
        return res.status(200).send(resHelper(addresses[0], "Address of user fetched"))
    }
}