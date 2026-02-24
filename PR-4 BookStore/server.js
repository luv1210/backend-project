const express = require("express");
const mongooseConnection = require("./config/mongoDBconnection");
const Book = require("./model/book.model");

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded());

server.get("/", async (req, res) => {
  const books = await Book.find()
  res.render("index", { books });
})

server.get("/add-book", (req, res) => {
  res.render("add-book")
})

server.post("/add-book", (req, res) => {
  Book.create(req.body)
  console.log("Book Added Succesfully")
  res.redirect("/");
})

server.get("/delete-book/:id", async(req, res) => {
  let id = req.params.id
  const books = await Book.findByIdAndDelete(id)
  res.redirect("/")
})

server.get("/edit-book/:id", async (req, res) => {
  let id = req.params.id
  const books = await Book.findById(id)
  res.render("edit-book", { books })
})

server.post("/edit-book/:id", async (req, res) => {
  let id = req.params.id
  const books = await Book.findByIdAndUpdate(id, req.body)
  res.redirect("/")
})



server.listen(8080, () => {
  mongooseConnection()
  console.log("Server is Running at http://localhost:8080")
})