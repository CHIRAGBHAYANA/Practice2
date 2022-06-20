const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const booksRoutes = require("./routes/bookRoutes");
const app = express();
connectDB();
app.use(express.json());
app.use(userRoutes);
app.use(booksRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
const port = 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
