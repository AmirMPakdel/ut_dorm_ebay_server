console.clear();
require("./models"); // initialize models at top (here) to avoid import order error
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes");
const middlewares = require("./middlewares");
const keys = require("./keys/dev");
const test = require('./test').test;

mongoose.connect(
  keys.mongo_url,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(">>> connected to database");

    test();
  }
);
const app = express();
app.use(bodyParser({limit: '2mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewares.log({ enabled: false }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(">>> listenning on Port : " + PORT);
});
