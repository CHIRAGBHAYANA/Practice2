const express = require("express");
const { auth, authorizedRoles } = require("../middleware/auth");
const {
  getAllBooks,
  createBook,
  checking,
} = require("../controllers/booksControllers");
const router = express.Router();

// router.route("/books").get(getAllBooks);

router.route("/admin/book/new").post(auth, createBook);
module.exports = router;
