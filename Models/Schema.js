const Schema = require("mongoose").Schema;

/**
 * const example = new Schema({
 *      key1 : DataType,
 *      key2 : DataType
 * })
 */

exports.User = new Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    name:String,
    avatar:String,
    created_at: Date,
    updated_at: Date,
    token:{
        type:String,
        // unique:true
    },
    sex:String,
    phone_number:String
})

exports.Admin = new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    name:String,
    avatar:String,
    created_at: Date,
    updated_at: Date,
    token:{
        type:String,
        // unique:true
    }
})

exports.Product = new Schema({
    title:String,
    rating:{
        type:Number,
        default:0
    },
    images:[String],
    sold:{
        type:Number,
        default:0
    },
    reviewer:{
        type:Number,
        default:0
    }
})

exports.Cart = new Schema({
    user_id:String,
    products_id:[String]
})

exports.Address = new Schema({
    user_id:String,
    address:[Object]
    // address:String,
    // postal_code:Number,
    // recipient:String,
    // phone_number:String
})

exports.Order = new Schema({
    user_id:String,
    delivery_address:Object,
    status:Object,
    products:[Object]
})