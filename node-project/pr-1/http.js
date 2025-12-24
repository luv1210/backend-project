const http = require('http')
const fs =  require('fs')

const port = 8000
const server  = http.createServer((req,res)=>{
 let filepath;
  switch (req.url) {
    case '/':
        filepath = './Home.html'
        break;
     case '/about':    
        filepath = './about.html'
        break;
        case '/services':   
        filepath = './services.html'
        break;
      case '/contact':
        filepath = './contact.html'
        break;

    default:
        filepath = './notfount.html'
        break;
  }
     let data = fs.readFileSync(filepath,'utf-8')
     res.write(data)
     res.end()
})

server.listen(port,(err)=>{
  if(err) console.log(err)
    else console.log(`http://localhost:${port}`)
})