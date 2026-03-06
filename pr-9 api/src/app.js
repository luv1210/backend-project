const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = 8080


// databasi connection 
require('./config/dbconnection')

// middalware

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.json())


app.use('/',require('./routes/index.route'))


app.listen(port,()=>{
    console.log(`server strat at http://localhost:${port}`)
})



