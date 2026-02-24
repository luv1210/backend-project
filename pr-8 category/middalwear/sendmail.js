const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT,10) : 587,
    secure: false,
    auth:{
        user: process.env.SMTP_USER || 'dhameliyaluv@gmail.com',
        pass: process.env.SMTP_PASS || 'ygmx bebx aybf dxql'
    }
})


const sendMail = async(message)=>{
    let respons  = await transport.sendMail({
        from: process.env.MAIL_FROM || message.from,
        ...message
    })
    console.log(respons)
}


module.exports = sendMail
