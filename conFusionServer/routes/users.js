var express = require("express");

const passport = require("passport");
const authenticate = require("../authenticate");
const cors = require("./cors");

const User = require("../models/user");

var router = express.Router();

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

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

  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res
          .status(401)
          .json({ success: false, status: "Login unsuccessful!", err: info });
      }

      req.logIn(user, (err) => {
        if (err) {
          res.status(401).json({
            success: false,
            status: "Login unsuccessful!",
            err: "Could not login!",
          });
        }

        const token = authenticate.getToken({ _id: req.user._id });
        res.status(200).json({
          success: true,
          token: token,
          status: "You are successfully logged in!",
        });
      });
    })(req, res, next);
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

router.get("/checkJWT", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, status: "JWT invalid", err: info });
    }

    return res
      .status(200)
      .json({ success: true, status: "JWT valid", user: user });
  })(req, res, next);
});

module.exports = router;
