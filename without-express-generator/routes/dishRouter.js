const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("Getting all dishes...");
  })
  .post((req, res) => {
    res.status(200).send("Creating a dish...");
  });

dishRouter
  .route("/:dishId")
  .get((req, res) => {
    res.status(200).send(`Getting dish: ${req.params.dishId}`);
  })
  .put((req, res) => {
    res.status(200).send(`Updating dish: ${req.params.dishId}`);
  })
  .delete((req, res) => {
    res.status(200).send(`Deleting dish: ${req.params.dishId}`);
  });

module.exports = dishRouter;
