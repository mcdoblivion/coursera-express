const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.listen(port, hostname, () => {
  console.log(`Server is listening on port ${port}`);
});
