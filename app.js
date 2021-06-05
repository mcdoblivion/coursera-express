const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.all("/", (req, res, next) => {
  console.log("Client hit the server");
  next();
});

app.get("/dishes", (req, res) => {
  res.status(200).send("Getting all dishes...");
});

app.get("/dishes/:dishId", (req, res) => {
  res.status(200).send(`Getting dish: ${req.params.dishId}`);
});

app.post("/dishes", (req, res) => {
  res.status(200).send("Creating a dish...");
});

app.put("/dishes/:dishId", (req, res) => {
  res.status(200).send(`Updating dish: ${req.params.dishId}`);
});

app.delete("/dishes/:dishId", (req, res) => {
  res.status(200).send(`Deleting dish: ${req.params.dishId}`);
});

app.listen(port, hostname, () => {
  console.log(`Server is listening on port ${port}`);
});
