const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { collectEmail, confirmEmail } = require("./email/controllers");
const { PORT, CLIENT_ORIGIN, DB_URL } = require("./config");
dotenv.config();

const awaitHandlerFactory = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

const app = express();
// add an email controller

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.json());

app.get("/wake-up", (req, res) => res.json("I'm awake! Sheesh! ☕️"));

app.post("/email", awaitHandlerFactory(collectEmail));

app.get("/email/confirm/:id", awaitHandlerFactory(confirmEmail));

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
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
