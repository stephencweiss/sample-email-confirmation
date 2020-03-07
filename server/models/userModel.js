const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fields = {
  email: {type: String},
  confirmed: { type: Boolean, default: false}
}

const userSchema = new Schema(fields)

module.exports = mongoose.model("User", userSchema)