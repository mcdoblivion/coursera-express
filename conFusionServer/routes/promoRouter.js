const express = require("express");
const bodyParser = require("body-parser");

const Promotions = require("../models/promotions");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// /promotions/
promoRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find({})
      .then(
        (promotions) => {
          res.status(200).json(promotions);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Promotions.create(req.body)
      .then(
        (promotion) => {
          console.log("Promotion created");
          res.status(200).json(promotion);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions/");
  })
  .delete((req, res, next) => {
    Promotions.remove({})
      .then(
        (response) => {
          console.log("All promotion deletted");

          res.status(200).json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

// /promotions/:promoId
promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then(
        (promotion) => {
          res.status(200).json(promotion);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotions/:promoId");
  })
  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promotion) => {
          res.status(200).json(promotion);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promoId)
      .then(
        (response) => {
          console.log("Promotion deleted");

          res.status(200).json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = promoRouter;
