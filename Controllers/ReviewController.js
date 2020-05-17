const {resHelper} = require('../Helpers/ResponseHelper')
const Order = new (require('../Models/Order'))()
const Product = new (require('../Models/Product'))()

module.exports = class Review{
    async index(req, res){
        const user_id = req.body.id
        let temp = await Order.get({user_id:user_id})
        let products =[]
        // get completed
        temp.forEach(order => {
            if(order.status.code==5){
                order.products.forEach(product=>{
                    if(product.reviewed==false){
                        products.push({
                            order_id:order._id,
                            product
                        })
                    }
                })
            }
        })
        return res.status(200).send(resHelper(products, "Product belum di review"))
    }

    async rate(req, res){
        const user_id = req.body.id
        let temp = await Order.get({user_id:user_id})
        let products = []
        temp.forEach(order => {
            if(order.status.code==5){
                order.products.forEach(product=>{
                    if(product._id==req.body.product_id){
                        product.rating = req.body.rating
                        product.reviewed = true
                    }
                    products.push(product)
                })
            }
        })

        let p = await Product.get({_id:req.body.product_id})
        p = p[0]
        let reviewer = p.reviewer+1
        let rating = (p.rating+req.body.rating)/reviewer
        let payload ={
            reviewer:reviewer,
            rating:rating
        }
        // console.log('products', products)
        await Product.update({_id:req.body.product_id}, payload)
        
        await Order.update({user_id:user_id}, {products: products})
        return res.status(200).send(resHelper({}, "rated"))
    }
}
