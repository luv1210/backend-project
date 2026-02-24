const express = require('express');

const passport = require('passport')
require('./middalwear/localstrategy')    
const session = require('express-session')

const flash = require('connect-flash');
const fleshMessage = require('./middalwear/fleshMessage');
const fs = require('fs');
const path = require('path');
const adminModel = require('./model/admin.model');
const bcrypt = require('bcrypt');

// server configration
const app = express()
const port = 9080;

//database connection
require('./config/dbconnection')

// middalware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
}
app.use(express.static('public'))
app.use("/uploads", express.static('uploads'))

//   create session
app.use(session({
    name: 'login',
    secret: 'devlop',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

// connect passport and session
app.use(passport.initialize())
app.use(passport.session())
if (typeof passport.isAuthenticated === 'function') {
    app.use(passport.isAuthenticated)
}
//flash message
app.use(flash())
app.use(fleshMessage)

// seed default admin if none exists (dev convenience)
// Route setup  
app.use('/', require('./routes/index.routes'))
app.use('/web',require('./routes/web.routes'))


app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})
