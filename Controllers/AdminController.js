const {resHelper} = require('../Helpers/ResponseHelper')
const bcrypt = require('bcrypt')
const admin = new (require('../Models/Admin'))()
const { v4: uuidv4 } = require('uuid');

module.exports = class Admin{
    async create(req, res){
        const username = req.body.username
        let password = req.body.password
        const name = req.body.name
        let data={}
        data['errors']={}
        if(username==undefined) data['errors']['username'] ="required"
        if(password==undefined) data['errors']['password'] ="required"
        if(name==undefined) data['errors']['name'] ="required"
        if(Object.keys(data.errors).length>0) return res.send(resHelper(data,"Missing required parameters"),400)
        
        // encrypt
        password = await bcrypt.hash(password, 10)

        // save to db
        const insert = await admin.insert({
            name:name,
            username:username,
            password:password,
            created_at: new Date(),
            updated_at: new Date()
        })

        if(insert==200) return res.status(201).send(resHelper({}, "Admin created"))
        return res.status(400).send(resHelper({'data':insert}, "Failed to registered admin, maybe username already used"))
    }

    async login(req,res){
        let payload={}
        payload.email = req.body.username
        payload.password = req.body.password
        let data={}
        data['errors']={}
        if(payload.email==undefined) data['errors']['username'] ="required"
        if(payload.password==undefined) data['errors']['password'] ="required"
        if(Object.keys(data.errors).length>0) return res.send(resHelper(data,"Missing required parameters"),400)
        
        let adminData = await admin.get({username:payload.email}, 'findOne')
        adminData = adminData[0]
        if(adminData==undefined) return res.status(400).send(resHelper({}, "Email or password is wrong"))
        
        let passwordEncrypt = adminData.password
        const match = await bcrypt.compare(payload.password, passwordEncrypt)
        
        if(!match) return res.status(400).send(resHelper({}, "Email or password is wrong"))
        let token = uuidv4()
        const insToken = await admin.update({_id:adminData._id},{token: token})
        adminData.token = token
        
        return res.status(200).send(resHelper(adminData, "Logged"))
    }
}