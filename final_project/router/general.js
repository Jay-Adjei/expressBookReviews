const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username": username, "password": password});
      res.status(200).json({message: "User successfully created"})
    } else {
      return res.status(404).json({message: "User already exits"})
    }
  }
  return res.status(404).json({message: "Unable to register"});
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
