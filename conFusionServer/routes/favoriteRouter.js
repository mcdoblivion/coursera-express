const express = require("express");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Favorites = require("../models/favorites");

const favoriteRouter = express.Router();

favoriteRouter.use(authenticate.verifyUser);
// /favorites
favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate(["user", "dishes"])
      .then(
        (favorites) => {
          res.status(200).json(favorites);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    const newFavoriteDishes = req.body;
    Favorites.findOne({ user: req.user._id })
      .then((favorites) => {
        if (favorites === null) {
          favorites = new Favorites({ user: req.user._id });
        }
        newFavoriteDishes.forEach((dish) => {
          if (favorites.dishes.indexOf(dish._id) === -1) {
            favorites.dishes.push(dish._id);
          }
        });
        favorites.save().then(
          (favorites) => {
            res.status(200).json(favorites);
          },
          (err) => next(err)
        );
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.status(403).end("PUT operation is not supported on /favorites/");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    const deleteFavoriteDishes = req.body;
    Favorites.findOne({ user: req.user._id })
      .then((favorites) => {
        if (favorites === null) {
          err = new Error("You do not have favorite dish!");
          err.status = 404;
          return next(err);
        }
        deleteFavoriteDishes.forEach((dish) => {
          const dishIndex = favorites.dishes.indexOf(dish._id);
          if (dishIndex !== -1) {
            favorites.dishes.splice(dishIndex, 1);
          }
        });
        favorites.save().then(
          (favorites) => {
            res.status(200).json(favorites);
          },
          (err) => next(err)
        );
      })
      .catch((err) => next(err));
  });

// /favorites/:dishId
favoriteRouter
  .route("/:dishId")
  .get(cors.cors, (req, res, next) => {
    res.status(403).end("GET operation is not supported on /favorites/:dishId");
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    const dishId = req.params.dishId;
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorites) => {
          if (favorites === null) {
            favorites = new Favorites({ user: req.user._id });
          }
          if (favorites.dishes.indexOf(dishId) === -1) {
            favorites.dishes.push(dishId);
          }
          favorites.save().then((favorites) => {
            res.status(200).json(favorites);
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.status(403).end("PUT operation is not supported on /favorites/:dishId");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    const dishId = req.params.dishId;
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorites) => {
          if (favorites === null) {
            err = new Error("You do not have favorite dish!");
            err.status = 404;
            return next(err);
          }
          if (favorites.dishes.indexOf(dishId) !== -1) {
            favorites.dishes.splice(favorites.dishes.indexOf(dishId), 1);
          }
          favorites.save().then((favorites) => {
            res.status(200).json(favorites);
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
