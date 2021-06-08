const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server.");

  Dishes.create({
    name: "dish 1",
    description: "Sample description",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove();
    })
    .then(() => {
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
