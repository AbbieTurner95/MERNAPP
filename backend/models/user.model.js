const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  email: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    default: ""
  },

  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", User, "users");
