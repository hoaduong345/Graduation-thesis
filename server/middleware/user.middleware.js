var validator = require("validator");
const httpStatus = require("../config/httpStatusCode");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createVali = async (req, res, next) => {
  const { username, name, email, password, confirmpassword, phonenumber } =
    req.body;

  var error = {};
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    error.username = "Username already exists!";
  }
  if ( !validator.isLength(name,1,30)) {
    error.name = "Name exceeds number of characters";
  } 
  if (!validator.isLength(password, 6, 18)) {
    error.password = " Password is not valid!";
  }
  if (confirmpassword != password) {
    error.password = "Confirm password must concides password";
  }
  if (!validator.isEmail(email)) {
    error.email = "Invalid email!";
  }
  if (!validator.isMobilePhone(phonenumber)) {
    error.email = "Invalid phone number!";
  }

  // If there are no validation errors, proceed to the next middleware
  next();
};
module.exports = { createVali };
