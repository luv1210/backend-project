const express = require('express')
const { addblogpage, addblog, viewblogpage, singleviewblogpage, deleteblog, editblog, updateblog} = require('../controller/blog.controller')
const upload = require('../middalwear/imageUpload')
const routes = express.Router()

/* ================= BLOG ROUTES ================= */

// add blog
routes.get('/add-blog', addblogpage)
routes.post('/add-blog', upload.single('authorImage'), addblog)

// view blogs (search + filter + sort via query params)
routes.get('/view-blog', viewblogpage)

// single blog view
routes.get('/view-blog/:id', singleviewblogpage)

// delete blog
routes.get('/delete-blog/:id', deleteblog)

// edit blog
routes.get('/edit-blog/:id', editblog)

// update blog
routes.post('/update-blog/:id', upload.single('authorImage'), updateblog)

module.exports = routes
