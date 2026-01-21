const path = require('path')
const fs = require('fs')
const moviemodel = require('../model/moves.model')
exports.homepage = async (req, res) => {
  try {
    let search = req.query.search || "";
    let sorting = req.query.sorting || "";
    let page = parseInt(req.query.page) || 1;

    const limit = 4;                
    const skip = (page - 1) * limit;

    let sortOption = {};
    if (sorting === "asc") sortOption = { title: 1 };
    if (sorting === "desc") sortOption = { title: -1 };

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
        { language: { $regex: search, $options: "i" } },
        { industry: { $regex: search, $options: "i" } }
      ]
    };

    const totalMovies = await moviemodel.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await moviemodel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.render("home", {
      movies,
      search,
      sorting,
      currentPage: page,
      totalPages
    });

  } catch (err) {
    console.error(err);
  }
};

exports.bollywood = async(req,res)=>{
   try {
    let search = req.query.search || "";
    let sorting = req.query.sorting || "";
    let page = parseInt(req.query.page) || 1;

    const limit = 4;
    const skip = (page - 1) * limit;

    let sortOption = {};
    if (sorting === "asc") sortOption = { title: 1 };
    if (sorting === "desc") sortOption = { title: -1 };

    // ✅ Correct merged query
    const query = {
      industry: "Bollywood",
      $or: [
        { title: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
        { language: { $regex: search, $options: "i" } }
      ]
    };

    const totalMovies = await moviemodel.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await moviemodel
      .find(query)             
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.render("home", {
      movies,
      search,
      sorting,
      currentPage: page,
      totalPages
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

exports.hollywood = async (req, res) => {
  try {
    let search = req.query.search || "";
    let sorting = req.query.sorting || "";
    let page = parseInt(req.query.page) || 1;

    const limit = 4;
    const skip = (page - 1) * limit;

    let sortOption = {};
    if (sorting === "asc") sortOption = { title: 1 };
    if (sorting === "desc") sortOption = { title: -1 };

    const query = {
      industry: "Hollywood",
      $or: [
        { title: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
        { language: { $regex: search, $options: "i" } }
      ]
    };

    const totalMovies = await moviemodel.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await moviemodel
      .find(query)           
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.render("home", {
      movies,
      search,
      sorting,
      currentPage: page,
      totalPages
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.addmoviepage = async (req, res) => {
    let search = ""
    let sorting = ""
    res.render('addmovie',{search,sorting})
}

exports.addmovi = async (req, res) => {
    let imagepath = ""
    if (req.file) {

        imagepath = `/uploads/${req.file.filename}`
    }

    try {
        await moviemodel.create({
            ...req.body,
            poster: imagepath
        })
        res.redirect('/')
    } catch (error) {
        console.log("error", error)
    }
}


exports.deletemovie = async (req, res) => {
    try {
        let id = req.params.id;
        
        let movie = await moviemodel.findById(id)

        if (!movie) {
            res.redirect('/')
        } else {
            if (movie.poster !== "") {
                let posterurl = path.join(__dirname, "..", movie.poster)
                await fs.unlinkSync(posterurl)
            }
            await moviemodel.findByIdAndDelete(id)
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.editmoviepage = async (req, res) => {
let search = ""
    let sorting = ""
    try {
        let id = req.params.id
        let movie = await moviemodel.findById(id)
        res.render('editmovie', { movie ,search,sorting})
    } catch (error) {
        console.log(error)
    }
}


exports.updatemovie = async (req, res) => {
    try {
        let id = req.params.id
        let movie = await moviemodel.findById(id)
        let posterurl = movie.poster
        if (req.file) {
            posterurl = path.join(__dirname, "..", posterurl)
            await fs.unlinkSync(posterurl)

            posterurl = `/uploads/${req.file.filename}`
        }

        await moviemodel.findByIdAndUpdate(id, {
            ...req.body,
            poster: posterurl
        },
            { new: true })

        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}