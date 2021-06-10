var express = require("express");
const bodyParser = require("body-parser");

const passport = require("passport");

const User = require("../models/user");
const { route } = require("../app");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(200).json({
            success: true,
            status: "Registration successful!",
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.status(200).json({
    success: true,
    status: "You are successfully logged in!",
  });
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
