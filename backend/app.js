const express = require("express")
const app= express();

const cookieparser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser)

const products = require('./routes/product')

const auth = require('./routes/auth')

app.get('/',(req,res)=>{
    res.send("dddd")
})


app.use('/api/v1',products)
app.use('/api/v1',auth)

app.use(errorMiddleware)

module.exports=app