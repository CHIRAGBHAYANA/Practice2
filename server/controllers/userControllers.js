const User = require("../models/user");
const sendToken = require("../utils/jwtTokenHandler");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  if (!email || !password) {
    return new ErrorHandler("Pleas Enter Email & Password", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }
  sendToken(user, 200, res);
};

const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
