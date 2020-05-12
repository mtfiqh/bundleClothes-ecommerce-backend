const mongoose = require('mongoose')
const schema = require('./Schema')
// const Logger = require('../Supports/Logger')

class Model{
    constructor(){
        this[this.constructor.name] = mongoose
            .model(this.constructor.name,schema[this.constructor.name])
    }
    
    static getModel(name){
        if(schema[name]!=undefined){
            return mongoose.model(name,schema[name])
        }
        throw new Error('No Schema Called '+name)
    }

    /**
     * Get data 
     * @param {Object} condition Object contains key-value. 
     * Ex : { name:"Dimas" } will get data where name = "Dimas"
     * @param {String} field Data Field. 
     * Ex : "name userID address" will get data contains name, userID and address
     * @param {String} type Default "FindAll". Specify results count 1 or more.
     * Can be "FindOne" or "FindAll"
     * 
     * @returns {Promise}
     */
    async get(condition={},type='findAll',field='',sort=null,limit=null){
        var result = await this[this.constructor.name].find(condition,field).sort(sort==null?{}:sort).limit(limit==null?0:limit)
        return result        
    }

    /**
     * Delete data
     * @param {Object} condition { key:value } 
     * @param {String} type 'deleteOne' || 'deleteMany' (default 'deleteOne')
     * 
     * @returns {Promise}
     */
    async delete(condition,type='deleteOne'){
        switch(type){
            case 'deleteOne':
                return this[this.constructor.name].deleteOne(condition,(err)=>{
                    if(err){
                        // Logger.error(this.constructor.name,err.message)
                        return err.code
                    }    
                    return 200
                })
            case 'deleteMany':
                return this[this.constructor.name].deleteMany(condition,(err)=>{
                    if(err){
                        // Logger.error(this.constructor.name,err.message)
                        return err.code
                    }
                    return 200
                })
        }
    }

    /**
     * Update Data
     * @param {Object} condition 
     * @param {Object} newValue 
     * @param {String} type updateOne || updateMany (default updateOne)
     */
    async update(condition,newValue,type='updateOne'){
        switch(type){
            case 'updateOne':
                return await this[this.constructor.name].updateOne(condition,newValue).catch(e=>{
                    // Logger.error(this.constructor.name,e.message)
                    return e
                })
            case 'updateMany':
                return await this[this.constructor.name].updateMany(condition,newValue).catch(e=>{
                    // Logger.error(this.constructor.name,e.message)
                    return e
                })
        }
    }
    
    /**
     * Insert Data
     * @param {Object} payload Data to insert
     */
    async insert(payload){
        this.obj = new this[this.constructor.name](payload)
        return this.obj.save().then(e=>{
            return 200
        }).catch(e=>{
            // Logger.error(this.constructor.name,e.message)
            return e
        })
    }

}

module.exports = Model