const dotenv = require("dotenv");
dotenv.config();
exports.PORT = process.env.PORT || 8080;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : "http://localhost:3000";

exports.DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_URL
  : `mongodb+srv://email_confirmer:${process.env.DB_PW}@cluster0-7i6ro.azure.mongodb.net/test?retryWrites=true&w=majority`
