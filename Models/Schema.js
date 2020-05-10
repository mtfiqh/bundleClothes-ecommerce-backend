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
        unique:true
    }
})