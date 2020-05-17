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
        temp.id=Math.random().toString(36).substring(5)
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
                id:x.id ? x.id : Math.random().toString(36).substring(5),
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
        let payload = {}
        let data = {errors:{}}
        let temp = {}
        const user_id = req.body.id
        payload.address = []
        let address_id = req.params.address_id
        if(address_id === undefined) return res.status(400).send(resHelper({}, "address_id not provided"))
        if(req.body.address===undefined && req.body.postal_code===undefined && req.body.recipient === undefined && req.body.phone_number === undefined){
            return res.status(400).send(resHelper({}, "Missing required parameters"))
        }
        let addresses = await model.get({user_id:user_id})
        let address = addresses[0]
        let found = false
        address.address.forEach(e=>{
            if(e.id == address_id){
                e.address = req.body.address ? req.body.address : e.address
                e.postal_code = req.body.postal_code ? req.body.postal_code : e.postal_code
                e.recipient = req.body.recipient ? req.body.recipient : e.recipient
                e.phone_number = req.body.phone_number ? req.body.phone_number : e.phone_number
                found=true
            }
            payload.address.push(e)
        })
        if(!found) return res.status(404).send(resHelper({}, "address_id not found"))
        await model.update({_id:address._id}, {address:payload.address})
        address = (await model.get({user_id:user_id}))[0]
        return res.status(200).send(resHelper(address, "Updated"))
    }
    async delete(req, res){
        let user_id = req.body.id
        let address_id = req.params.address_id
        let data = await model.get({user_id:user_id})
        if(Object.keys(data).length<1){
            await model.insert({user_id:id})
            return res.status(404).send(resHelper({}, "Address of this user not found"))
        }
        data=data[0]
        let found=false
        let temp = {}
        let payload = {}
        payload.address = []
        data.address.forEach(addr => {
            if(addr.id == address_id){
                found = true
            }else{
                payload.address.push(addr)
            }
        })
        if(!found) return res.status(404).send(resHelper({},"No address of this user found"))
        await model.update({user_id:user_id},{address: payload.address})
        data = await model.get({user_id:user_id})
        return res.status(200).send(resHelper(data[0], "deleted"))
    }
    async read(req, res){
        let user_id = req.body.id
        let address_id = req.params.address_id
        let data = await model.get({user_id:user_id})
        if(Object.keys(data).length<1){
            await model.insert({user_id:id})
            return res.status(404).send(resHelper({}, "Address of this user not found"))
        }
        data=data[0]
        let found=false
        let temp = {}
        let payload = {}
        payload.address = {}
        data.address.forEach(addr => {
            if(addr.id == address_id){
                found = true
                payload.address = addr
                // break
            }
        })
        if(!found) return res.status(404).send(resHelper({}, "not found"))
        return res.status(200).send(resHelper(payload.address, "Data fetched"))
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