const {resHelper} = require('../Helpers/ResponseHelper')
const model = new (require('../Models/Cart'))()
const product = new (require('../Models/Product'))()

module.exports = class Cart{
    async index(req, res){
        
    }

    async self(req, res){
        const user_id = req.body.id
        let data = await model.get({user_id})
        if(Object.keys(data).length<1){
            await model.insert({user_id})
            data = await model.get({user_id})
        }
        return res.status(200).send(resHelper(data[0], "cart of this user fetched"))
    }

    async add(req, res){
        let payload={user_id:req.body.id}
        let data = {}
        req.body.product_id ? payload.product_id = req.body.product_id : data.errors = {product_id:"required"}
        let prod = await product.get({_id:payload.product_id})
        if(Object.keys(data).length>0) return res.status(400).send(resHelper(data, "Missing required parameters"))
        if(Object.keys(prod).length<1) return res.status(404).send(resHelper({}, "Product id not found"))
        
        let cart = await model.get({user_id:payload.user_id})
        let temp ={}
        if(cart.length<1){
            console.log('create')
            temp = await model.insert({user_id:payload.user_id, products_id:payload.product_id})
        }else{
            console.log('update')
            cart = cart[0]
            payload.products_id = cart.products_id
            payload.products_id.push(payload.product_id)
            temp = await model.update({user_id:payload.user_id}, {products_id:payload.products_id}) 
        }

        let userCart = await model.get({user_id:payload.user_id})
        return res.status(201).send(resHelper(userCart[0], "Cart added"))
        
    }

    async min(req, res){
        let payload={user_id:req.body.id}
        let data = {}
        req.params.product_id ? payload.product_id = req.params.product_id : data.errors = {product_id:"required"}
        let prod = await product.get({_id:payload.product_id})
        if(Object.keys(data).length>0) return res.status(400).send(resHelper(data, "Missing required parameters"))
        if(Object.keys(prod).length<1) return res.status(404).send(resHelper({}, "Product id not found"))
        
        let cart = await model.get({user_id:payload.user_id})
        let temp ={}
        if(cart.length<1){
            console.log('create')
            temp = await model.insert({user_id:payload.user_id, products_id:payload.product_id})
            return res.status(200).send(resHelper({}, "Cart is empty"))
        }
        temp = await model.get({user_id:payload.user_id})
        temp = temp[0]
        payload.products_id=[]
        let found = false
        temp.products_id.forEach(id => {
            if(id!=payload.product_id) payload.products_id.push(id)
            else{
                found=true
                payload.product_id=undefined
            }
        });
        if(!found) return res.status(400).send(resHelper({}, "Product id not found in cart"))
        await model.update({_id:temp._id}, {products_id:payload.products_id})
        temp = await model.get({_id:temp._id})
        return res.status(201).send(resHelper(temp[0], "Product id deleted from cart"))
    }
}