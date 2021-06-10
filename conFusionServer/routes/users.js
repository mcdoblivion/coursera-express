var express = require("express");
const bodyParser = require("body-parser");

const User = require("../models/user");
const { route } = require("../app");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error("User " + req.body.username + " already exist!");
        err.status = 403;
        next(err);
      } else {
        return User.create({
          username: req.body.username,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        res
          .status(200)
          .json({ status: "Registration successful!", user: user });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error("You are not authenticated!");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    var auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          var err = new Error("User " + username + "doesn't exits!");
          err.status = 403;
          return next(err);
        } else if (user.password !== password) {
          var err = new Error("Your password is incorrect!");
          err.status = 403;
          return next(err);
        } else if (username === user.username && password === user.password) {
          req.session.user = "authenticated";
          res.status(200).end("You are authenticated!");
        }
      })
      .catch((err) => next(err));
  } else {
    res.status(200).end("You are already authenticated!");
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
