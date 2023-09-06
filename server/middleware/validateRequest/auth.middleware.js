"use strict";

const validator = require("validator");
const httpStatus = require("../../config/httpStatusCode");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createVali = async (req, res, next) => {
  const { username, name, email, password, confirmpassword, phonenumber } =
    req.body;

  const error = {};

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    error.username = "Username already exists!";
  }
  if (!email) {
    error.email = console.log("company_email_require");
  } else if (!validator.isEmail(email)) {
    error.email = console.log("email_format");
  }
  if (!username) {
    error.username = console.log("username_require");
  } else if (!validator.isLength(username, { min: 5, max: 20 })) {
    error.username = getMsg("username_length");
  } else if (!validator.isAlphanumeric(username)) {
    error.username = console.log("username_format");
  }

  if (!name) {
    error.name = "name_require";
  } else if (!validator.isLength(name, { min: 5, max: 30 })) {
    error.name = "name_length";
  } else if (!validator.isAlphanumeric(name)) {
    error.name = "name_format";
  }

  if (!password) {
    error.password = "password_require";
  } else if (!validator.isLength(password, { min: 6, max: 20 })) {
    error.password = "password_length";
  }

  if (!confirmpassword) {
    error.confirmpassword ="confirm_password_require";
  } else if (!validator.equals(password, confirmpassword)) {
    error.confirmpassword = "confirm_password_must_match";
  }

  if (!phonenumber) {
    error.phonenumber = "Phone number is required";
  } else {
    // Define a regular expression pattern for a valid phone number.
    const phonePattern = /^0\d{9}$/; // This pattern assumes a 10-digit phone number.

    // Test the phone number against the pattern.
    if (!phonePattern.test(phonenumber)) {
      error.phonenumber = "Invalid phone number format";
    }
  }
  
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  }
  req.username = username.toLowerCase().trim();
  req.password = password.trim();
  req.name = name.trim();
  req.email = email.toLowerCase().trim();
  req.phonenumber = phonenumber.trim();

  next();
};

module.exports = {
  createVali,
};
