var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
  name: String,
  bio: String,
  skills: String,
  yearsExp: String,
  why: String
});

var dataModel = module.exports = mongoose.model("submissions", UserSchema);