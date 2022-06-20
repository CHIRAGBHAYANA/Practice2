const Books = require("../models/books");

const createBook = async (req, res) => {
  const { name, description, author } = req.body;

  const book = await Books.create({
    name,
    description,
    author,
  });
  res.send(book);
};

const getAllBooks = async (req, res) => {};

const checking = async (req, res) => {
  res.send("hello");
};

module.exports = {
  getAllBooks,
  createBook,
  checking,
};
