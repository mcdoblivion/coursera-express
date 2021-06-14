var express = require("express");

const passport = require("passport");
const authenticate = require("../authenticate");
const cors = require("./cors");

const User = require("../models/user");

var router = express.Router();

/* GET users listing. */
router.get(
  "/",
  cors.cors,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).json(users);
    });
  }
);

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.status(500).json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.status(200).json({
              success: true,
              status: "Registration successful!",
            });
          });
        });
      }
    }
  );
});

router.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local"),
  (req, res, next) => {
    const token = authenticate.getToken({ _id: req.user._id });

    res.status(200).json({
      success: true,
      token: token,
      status: "You are successfully logged in!",
    });
  }
);

router.get("/logout", cors.cors, (req, res) => {
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

router.get(
  "/facebook/token",
  cors.cors,
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      const token = authenticate.getToken({ _id: req.user._id });
      res.status(200).json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);

module.exports = router;
