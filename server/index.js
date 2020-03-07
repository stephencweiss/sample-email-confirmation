const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, CLIENT_ORIGIN, DB_URL } = require("./config");

dotenv.config();

const app = express();
// add an email controller

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.json());

app.get("/wake-up", (req, res) => res.json("I'm awake! Sheesh! ☕️"));

app.post("/email", (req, res) => {
  res.status(200);
  res.json({ msg: "Need to implement a controller" });
  res.send(); // is this not needed?
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose
  .connect(DB_URL, options, () => {
    app.listen(PORT, () =>
      console.log(`Server is up and listening on port ${PORT}.`)
    );
  })
  .catch(err => console.error(`Connection failed -> \n`, err));
