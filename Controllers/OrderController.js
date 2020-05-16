
const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Order'))()
const productModel = new (require('../Models/Product'))()
module.exports = class Order{

    async create(req,res){
        const products_id = req.body.products_id
        let delivery_address = {}
        let user_id = req.body.id
        let payload={}
        payload.products = []
        let notfound=[]
        if(products_id!=undefined){
            console.log('length', products_id.length)
            if(products_id.length==3 || products_id.length==6){}else return res.status(400).send(resHelper({}, "products_id, not 3 or 6"))
            let id
            // console.log('products_id', products_id)
            for(id of products_id){
                // console.log('id', id)
                // console.log('here')
                let temp = await productModel.get({_id:id})
                temp=temp[0]
                console.log('temp',temp.sold+1)
                temp.reviewed = false
                await productModel.update({_id:id}, {sold:temp.sold+1})
                // console.log('temp length', temp)
                if(temp.length<1 || temp == 404){
                    // console.log('in')
                    notfound.push(id)
                }
                let tmp = {
                    images:temp.images,
                    _id:temp._id,
                    rating:0,
                    title:temp.title
                }
                payload.products.push(tmp)
            }
        }
        console.log('out')
        if(notfound.length>0) return res.status(404).send(resHelper({notfound}, "product_id not found"))

        payload.delivery_address = {
            address:req.body.address,
            postal_code:req.body.postal_code,
            recipient:req.body.recipient,
            phone_number:req.body.phone_number
        }

        payload.status = {
            detail:"Packing",
            code:2
        }

        let ins = await model.insert({
            user_id:user_id,
            delivery_address:payload.delivery_address,
            status:payload.status,
            products:payload.products
        })
        return res.status(201).send(resHelper(ins, "Order created"))
    }

    async self(req, res){
        let user_id = req.body.id
        let  data = await model.get({user_id:user_id})
        if(data==404) return res.status(200).send(resHelper({}, "empty"))
        return res.status(200).send(resHelper(data, "All user orders fetched"))
    }

    async selfOnProcess(req, res){
        let user_id = req.body.id
        let  data = await model.get({user_id:user_id})
        if(data==404) return res.status(200).send(resHelper({}, "empty"))
        let send = []
        for(let d of data){
            if(d.status.code<5){
                send.push(d)
            }
        }
        return res.status(200).send(resHelper(send, "All user orders on process fetched"))
    }

    async selfOnComplete(req, res){
        let user_id = req.body.id
        let  data = await model.get({user_id:user_id})
        if(data==404) return res.status(200).send(resHelper({}, "empty"))
        let send = []
        for(let d of data){
            if(d.status.code==5){
                send.push(d)
            }
        }
        return res.status(200).send(resHelper(send, "All user orders on complete fetched"))
    }
    
    async setToCompleteUserSide(req, res){
        const user_id = req.body.id
        let order_id = req.body.order_id
        let data = await model.get({user_id:user_id, _id:order_id})
        // console.log('data', data)
        if(data.length<1) return res.status(404).send(resHelper({}, "not found"))
        await model.update({user_id:user_id, _id:order_id}, {status:{detail:"Completed", code:5}})
        data = await model.get({user_id:user_id, _id:order_id})
        data = data[0]
        return res.status(200).send(resHelper(data, "Set to completed"))
    }
    // admin
    async index(req, res){
        let data = await model.get({})
        return res.status(200).send(resHelper(data, "All orders fetched"))
    }

    async onProcess(req, res){
        let data = await model.get({})
        let send = []
        for(let d of data){
            if(d.status.code<5){
                send.push(d)
            }
        }
        return res.status(200).send(resHelper(send, "All user orders on process fetched"))
    }

    async onComplete(req, res){
        let data = await model.get({})
        let send = []
        for(let d of data){
            if(d.status.code==5){
                send.push(d)
            }
        }
        return res.status(200).send(resHelper(send, "All user orders on process fetched"))
    }
    
}


