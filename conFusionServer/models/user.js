const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    reuired: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

var User = mongoose.model("User", userSchema);

module.exports = User;
