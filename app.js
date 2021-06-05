const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dishRouter = require("./routes/dishRouter");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use("/dishes", dishRouter);

app.all("/", (req, res, next) => {
  console.log("Client hit the server");
  next();
});

app.listen(port, hostname, () => {
  console.log(`Server is listening on port ${port}`);
});
