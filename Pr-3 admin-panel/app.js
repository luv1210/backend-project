const express = require('express')
const app = express()
const port = 8080

app.set('view engine','ejs')
// app.use(express.urlencoded())
app.use(express.static('public'))
app.get('/',(req,res)=>{
   res.render("index")
})

app.get('/charts',(req,res)=>{
   res.render("charts")

})

app.get('/widgets',(req,res)=>{
   res.render("widgets")

})

app.get('/tables',(req,res)=>{
   res.render("tables")

})

app.get('/grid',(req,res)=>{
   res.render("grid")

})

app.get('/form-basic',(req,res)=>{
   res.render("form-basic")

})
app.get('/form-wizard',(req,res)=>{
   res.render("form-wizard")

})

app.get('/pages-buttons',(req,res)=>{
   res.render("pages-buttons")

})

app.get('/icon-material',(req,res)=>{
   res.render("icon-material")

})

app.get('/icon-fontawesome',(req,res)=>{
   res.render("icon-fontawesome")

})

app.get('/pages-elements',(req,res)=>{
   res.render("pages-elements")

})

app.get('/index2',(req,res)=>{
   res.render("index2")

})

app.get('/pages-gallery',(req,res)=>{
   res.render("pages-gallery")

})

app.get('/pages-calendar',(req,res)=>{
   res.render("pages-calendar")

})

app.get('/pages-invoice',(req,res)=>{
   res.render("pages-invoice")

})

app.get('/pages-chat',(req,res)=>{
   res.render("pages-chat")

})


app.get('/authentication-login',(req,res)=>{
   res.render("authentication-login")

})

app.get('/authentication-register',(req,res)=>{
   res.render("authentication-register")

})

app.get('/error-403',(req,res)=>{
   res.render("error-403")

})

app.get('/error-404',(req,res)=>{
   res.render("error-404")

})

app.get('/error-405',(req,res)=>{
   res.render("error-405")

})

app.get('/error-500',(req,res)=>{
   res.render("error-500")

})
 
app.listen(port,()=>{
    console.log(`Server start at http://localhost:${port}`)

})