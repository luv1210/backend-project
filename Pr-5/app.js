const express = require('express')
const dbconnection = require('./config/dbconnection')
const app = express()
const port  = 8080;

app.set('view engine','ejs')
app.use(express.urlencoded())
app.use('/uploads',express.static('uploads'))
app.use('/',require('./routes/index.routes'))

app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`)
})