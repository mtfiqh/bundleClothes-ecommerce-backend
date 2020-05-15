require("dotenv").config();
const db = require("mongoose");
db.connect(process.env.MONGODB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// git
const git = require('simple-git/promise')
// import
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
// define object
const app = express()
app.use(cors())
app.use(express.static('./public'))
// use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// prefix
const prefix = '/api/v1'

// route
app.use(prefix+'/pull', async (req,res)=>{
    const x = await git().pull('origin', 'development')
    res.status(200).send(x)
})
app.use(prefix+'/', require('./Routers/TestRouter'))
app.use(prefix+'/product', require('./Routers/ProductRouter'))
app.use(prefix+'/user', require('./Routers/UserRouter'))
app.use(prefix+'/user/cart', require('./Routers/CartRouter'))
app.use(prefix+'/user/address', require('./Routers/AddressRouter'))

app.use(prefix+'/admin', require('./Routers/AdminRouter'))
app.use(prefix+'/admin/product', require('./Routers/ProductRouter'))

// listen
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})