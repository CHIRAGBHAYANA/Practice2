const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {
  let token = req.headers.cookie;
  if (!token) {
    throw new Error("Please Login to access this resource");
  }
  token = token.split("=")[1];
  const decodedData = jwt.verify(token, "qwertyuiop");
  req.user = await User.findById(decodedData.id);
  next();
};

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `Role: ${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { auth, authorizedRoles };
