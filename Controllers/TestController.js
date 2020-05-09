
module.exports = class Test{

    async index(req,res){
        console.log('hit')
       return res.send({message:"connected"})
    }

}


