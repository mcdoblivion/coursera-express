const mongoose = require("mongoose");
const Dishes = require("./dishes");
const User = require("./user");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    dishes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Dishes",
    },
  },
  { timestamps: true }
);

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
