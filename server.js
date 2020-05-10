require("dotenv").config();
const db = require("mongoose");
db.connect(process.env.MONGODB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// import
const express = require('express')
const bodyParser = require('body-parser');

// define object
const app = express()

// use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// prefix
const prefix = '/api/v1'

// route
app.use(prefix+'/', require('./Routers/TestRouter'))
app.use(prefix+'/user', require('./Routers/UserRouter'))

// listen
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})