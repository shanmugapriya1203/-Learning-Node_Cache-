const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
});

const User = mongoose.model("User", schema);
module.exports = User;
