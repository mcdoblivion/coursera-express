const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("Getting all leaders...");
  })
  .post((req, res) => {
    res.status(200).send("Creating a leader...");
  });

leaderRouter
  .route("/:leaderId")
  .get((req, res) => {
    res.status(200).send(`Getting leader: ${req.params.leaderId}`);
  })
  .put((req, res) => {
    res.status(200).send(`Updating leader: ${req.params.leaderId}`);
  })
  .delete((req, res) => {
    res.status(200).send(`Deleting leader: ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
