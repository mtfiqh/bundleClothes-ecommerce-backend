const model = new (require('../Models/Product'))()
const {resHelper} = require('../Helpers/ResponseHelper')

module.exports = class Product{

    async index(req,res){
        let data = await model.get()
        if(Object.keys(data).length<1) return res.send(resHelper({}, "Product Empty"),404)
        return res.send(resHelper(data, "All products fetched"),200)
    }
    async read(req, res){
        const id = req.params.id
        if(id === undefined) return res.status(400).send(resHelper({"errors":{"id":"required"}}, "Missing params"))
        let data = await model.get({_id:id})
        if(data===404) return res.status(404).send(resHelper({}, "Not found"))
        data = data[0]
        res.status(200).send(resHelper(data, "Product fetched"))
    }
    async create(req, res){
        let payload = {}
        let data = {}
        let images={}
        data.errors= {}
        req.body.name ? payload.name = req.body.name : data.errors.name = "required"
        req.files  ? (req.files.length>0 ? images = req.files : data.errors.files = "required") : data.errors.files = "required"
        
        if(Object.keys(data.errors).length>0) return res.send(resHelper(data, "Missing required parameters"), 400)
        payload.images=[]
        images.forEach(file => {
            payload.images.push('products/'+file.filename)
        });
        let ins = await model.insert(payload)
        return res.send(resHelper(ins, "successful"), 201)
    }

    async update(req, res){
        const id = req.params.id
        if(id === undefined) return res.status(400).send(resHelper({"errors":{"id":"required"}}, "Missing params"))
        let data = await model.get({_id:id})
        if(data===404) return res.status(404).send(resHelper({}, "Not found"))
        let payload = {}
        let images = {}
        req.body.name ? payload.name = req.body.name : ''
        req.files ? (req.files.length>0 ? images = req.files : '') : ''
        if(images.length<1 && req.body.name===undefined) return res.status(400).send(resHelper({}, "Missing required parameters"))
        if(images.length>0){
            payload.images=[]
            images.forEach(file => {
                payload.images.push('products/'+file.filename)
            });
        }
        
    }
}