const { currntdate } = require('../middalwear/currntDate')
const blogmodle = require('../model/blog.model')
const path = require('path')
const fs = require('fs')

/* ================= ADD BLOG PAGE ================= */
exports.addblogpage = async (req, res) => {
  try {
    res.render('blog/addblog')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

/* ================= ADD BLOG ================= */
exports.addblog = async (req, res) => {
  try {
    let imagepath = ""
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`
    }

    await blogmodle.create({
      ...req.body,
      authorImage: imagepath,
      date: currntdate()
    })

    res.redirect('/blog/view-blog')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

exports.viewblogpage = async (req, res) => {
  try {
    let search = req.query.search || ""
    let category = req.query.category || ""
    let status = req.query.status || ""
    let sort = req.query.sort || ""

    let filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ]
    }

    if (category) {
      filter.category = category
    }

    if (status) {
      filter.status = status
    }

    let sortOption = {}
    if (sort === "title_asc") {
      sortOption.title = 1
    } else if (sort === "title_desc") {
      sortOption.title = -1
    } else if (sort === "newest") {
      sortOption.createdAt = -1
    }

    let blogs = await blogmodle.find(filter).sort(sortOption)

    // category dropdown ke liye
    let categories = await blogmodle.distinct("category")

    res.render('blog/viewblog', {
      blogs,
      categories,
      search,
      category,
      status,
      sort
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

exports.singleviewblogpage = async (req, res) => {
  try {
    const id = req.params.id
    let blog = await blogmodle.findById(id)
    res.render('blog/singleviewblog', { blog })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

/* ================= DELETE BLOG ================= */
exports.deleteblog = async (req, res) => {
  try {
    const id = req.params.id
    let blog = await blogmodle.findById(id)

    if (blog.authorImage) {
      let imageurl = path.join(__dirname, "..", blog.authorImage)
      if (fs.existsSync(imageurl)) {
        fs.unlinkSync(imageurl)
      }
    }

    await blogmodle.findByIdAndDelete(id)
    res.redirect('/blog/view-blog')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

/* ================= EDIT BLOG ================= */
exports.editblog = async (req, res) => {
  try {
    const id = req.params.id
    let blog = await blogmodle.findById(id)
    res.render('blog/editblog', { blog })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

/* ================= UPDATE BLOG ================= */
exports.updateblog = async (req, res) => {
  try {
    let id = req.params.id
    let blog = await blogmodle.findById(id)
    let imagepath = blog.authorImage

    if (req.file) {
      if (imagepath) {
        let imageurl = path.join(__dirname, "..", imagepath)
        if (fs.existsSync(imageurl)) {
          fs.unlinkSync(imageurl)
        }
      }
      imagepath = `/uploads/${req.file.filename}`
    }

    await blogmodle.findByIdAndUpdate(
      id,
      { ...req.body, authorImage: imagepath },
      { new: true }
    )

    res.redirect(`/blog/view-blog/${id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/blog/view-blog')
  }
}

