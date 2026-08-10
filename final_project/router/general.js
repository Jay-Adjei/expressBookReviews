const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json(books);
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(300).json(books, null, 4);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn], null, 4);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = {};
  for (let isbn in books) {
    if (books[isbn].author === author) {
      filteredBooks[isbn] = books[isbn];
    }
  }
  return res.status(300).json(filteredBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filteredBooks = {};
  for (isbn in books) {
    if (books[isbn].title === title) {
      filteredBooks[isbn] = books[isbn];
    }
  }
  return res.status(300).json(filteredBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  return res.status(300).json(books[isbdn].reviews);
});

module.exports.general = public_users;
