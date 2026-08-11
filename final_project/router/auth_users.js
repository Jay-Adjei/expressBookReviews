const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let filteredUser;
  if (username && password) {
    filteredUser = users.filter(
      (user) => user.username === username && user.password === password,
    );
  }
  if (filteredUser.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });
    console.log(accessToken);
    req.session.authorization = { accessToken, username };
    return res
      .status(200)
      .json({
        message: "User successfully logged in",
        accessToken: accessToken,
      });
  } else {
    return res.status(208).json({ message: "Invalid login credentials" });
  }
  return res.status(300).json({ message: "User could not be logged in" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (!isbn || !review) {
    return res.status(400).json({ message: "ISBN and Review are required" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required!" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found!" });
  }
  delete books[isbn].reviews[username];
  return res.status(200).json({message: "Book review has been deleted successfully"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
