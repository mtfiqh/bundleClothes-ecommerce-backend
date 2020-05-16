const {resHelper} = require('../Helpers/ResponseHelper')
const Order = new (require('../Models/Order'))()

module.exports = class Review{
    async index(req, res){
        const user_id = req.body.id
        let orders = await Order.get({user_id:user_id, status:{code:5}})
        console.log(orders)
    }
}
