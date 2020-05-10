const {resHelper} = require('../Helpers/ResponseHelper')
const bcrypt = require('bcrypt')
const User = new require('../Models/User')
const user = new User()
const { v4: uuidv4 } = require('uuid');

module.exports = class User{
    async create(req, res){
        const email = req.body.email
        let password = req.body.password
        let data={}
        data['errors']={}
        if(email==undefined) data['errors']['email'] ="required"
        if(password==undefined) data['errors']['password'] ="required"
        if(Object.keys(data.errors).length>0) return res.send(resHelper(data,"Missing required parameters"),400)
        
        // encrypt
        password = await bcrypt.hash(password, 10)

        const id = uuidv4()
        // save to db
        const insert = await user.insert({
            email:email,
            password:password,
            created_at: new Date(),
            updated_at: new Date()
        })

        if(insert==200) return res.status(201).send(resHelper({}, "User created"))
        return res.status(400).send(resHelper({}, "Failed to registered user, maybe email already used"))
    }

    async login(req,res){
        let payload={}
        payload.email = req.body.email
        payload.password = req.body.password
        let data={}
        data['errors']={}
        if(payload.email==undefined) data['errors']['email'] ="required"
        if(payload.password==undefined) data['errors']['password'] ="required"
        if(Object.keys(data.errors).length>0) return res.send(resHelper(data,"Missing required parameters"),400)
        
        let userData = await user.get({email:payload.email}, 'findOne')
        userData = userData[0]
        if(userData==undefined) return res.status(400).send(resHelper({}, "Email or password is wrong"))
        
        let passwordEncrypt = userData.password
        const match = await bcrypt.compare(payload.password, passwordEncrypt)
        
        if(!match) return res.status(400).send(resHelper({}, "Email or password is wrong"))
        let token = uuidv4()
        const insToken = await user.update({_id:userData._id},{token: token})
        userData.token = token
        
        return res.status(200).send(resHelper(userData, "Logged"))
    }
}