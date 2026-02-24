const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
    secure:false,
    auth:{
        user:'dhameliyaluv@gmail.com',
        pass:'ygmx bebx aybf dxql'
    }
})


const sendMail = async(message)=>{
    let respons  = await transport.sendMail(message)
    console.log(respons)
}


module.exports = sendMail