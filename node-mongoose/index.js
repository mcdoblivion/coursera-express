const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server.");

  Dishes.create({
    name: "dish 23",
    description: "Sample description",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        { $set: { description: "Updated sample description" } },
        { new: true }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rate: 5,
        comment: "Great !!!",
        author: "mcd.oblivion",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.remove();
    })
    .then(() => {
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
