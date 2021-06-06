const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("Getting all promotions...");
  })
  .post((req, res) => {
    res.status(200).send("Creating a promotion...");
  });

promoRouter
  .route("/:promoId")
  .get((req, res) => {
    res.status(200).send(`Getting promotion: ${req.params.promoId}`);
  })
  .put((req, res) => {
    res.status(200).send(`Updating promotion: ${req.params.promoId}`);
  })
  .delete((req, res) => {
    res.status(200).send(`Deleting promotion: ${req.params.promoId}`);
  });

module.exports = promoRouter;
