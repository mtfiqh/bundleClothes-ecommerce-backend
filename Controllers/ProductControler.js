const model = new (require('../Models/Product'))()
const {resHelper} = require('../Helpers/ResponseHelper')
const fs = require('fs')
module.exports = class Product{

    async index(req,res){
        let url = req.protocol+'://'+req.get('host')+'/'
        let data = await model.get()
        if(Object.keys(data).length<1) return res.send(resHelper({}, "Product Empty"),404)
        let i=0, j=0
        data.forEach(d=>{
            if(Object.keys(d.images).length>0){
                j=0
                d.images.forEach(img=>{
                    data[i].images[j] = url+img
                    j++
                })
            }
            i++
        })
        return res.send(resHelper(data, "All products fetched"),200)
    }
    async read(req, res){
        let url = req.protocol+'://'+req.get('host')+'/'
        const id = req.params.id
        if(id === undefined) return res.status(400).send(resHelper({"errors":{"id":"required"}}, "Missing params"))
        let data = await model.get({_id:id})
        if(data===404) return res.status(404).send(resHelper({}, "Not found"))
        data = data[0]
        if(Object.keys(data.images).length>0){
            let i = 0
            data.images.forEach(img=>{
                data.images[i] = url+img
                i++
            })
        }
        res.status(200).send(resHelper(data, "Product fetched"))
    }
    async create(req, res){
        let payload = {}
        let data = {}
        let images={}
        data.errors= {}
        req.body.title ? payload.title = req.body.title : data.errors.title = "required"
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
        let images = []
        req.body.title ? payload.title = req.body.title : ''
        req.files ? (req.files.length>0 ? images = req.files : '') : ''
        console.log('title', req.body.title, 'images length', images.length)
        if(images.length<1 && req.body.title===undefined) return res.status(400).send(resHelper({}, "Missing required parameters"))
        if(images.length>0){
            payload.images=[]
            images.forEach(file => {
                payload.images.push('products/'+file.filename)
            });
        }
        await model.update({_id:id}, payload, 'updateOne')
        data = await model.get({_id:id})
        data=data[0]
        return res.status(200).send(resHelper(data, "Updated"))
    }

    async delete(req, res){
        const id = req.params.id
        if(id === undefined) return res.status(400).send(resHelper({"errors":{"id":"required"}}, "Missing params"))
        let data = await model.get({_id:id})
        if(data===404) return res.status(404).send(resHelper({}, "Not found"))
        data=data[0]
        data.images.forEach(image =>{
            fs.unlinkSync('public/'+image)
        })
        await model.delete({_id:id})
        return res.status(200).send(resHelper({}, "Deleted"))
    }

    async search(req, res){
        const q = req.params.q
        // const query = '/'+q+'/'
        // console.log(reg)
        let data = await model.get({title: {$regex: new RegExp('.*' + q.toLowerCase() + '.*')}})
        console.log('data', data)
        return res.status(200).send(resHelper(data, "fetched"))
    }
}