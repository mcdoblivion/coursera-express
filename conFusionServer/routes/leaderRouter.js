const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");

const Leaders = require("../models/leaders");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// /leaders/
leaderRouter
  .route("/")
  .get((req, res, next) => {
    Leaders.find({})
      .then(
        (leaders) => {
          res.status(200).json(leaders);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Leaders.create(req.body)
      .then(
        (leader) => {
          console.log("Leader created");
          res.status(200).json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders/");
  })
  .delete(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /leaders/");
  });

// /leaders/:leaderId
leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          res.status(200).json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/:leaderId");
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (leader) => {
          res.status(200).json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndDelete(req.params.leaderId)
      .then(
        (response) => {
          console.log("Leader deleted");

          res.status(200).json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = leaderRouter;
