const User = require("../models/userModel");
const { sendEmail } = require("./config");
const { messages } = require("./templates/messages");
const { confirmation } = require("./templates/confirmation");

/**
 * States of a user (-> action to take):
 * Created -> send
 * Awaiting Confirmation -> resend
 * Confirmed -> already confirmed
 * ... to add - deleted/unsubscribed
 */

/**
 * The controller for the email collection form submission
 */
function collectEmail(req, res) {
  const { email } = req.body;
  User.findOne({ email })
    .then(user => {
      // this is a new user! send a confirmation email;
      // findOne return if nothing found is null: https://docs.mongodb.com/manual/reference/method/db.collection.findOne/#db.collection.findOne
      if (!user) {
        User.create({ email })
          .then(newUser =>
            sendEmail(newUser.email, confirmation.email(newUser._id))
          )
          .then(() => res.json({ message: messages.CONFIRM }))
          .catch(err => {
            res.json({ error: err });
            console.error(err);
          });
      }
      // if user exists and is not confirmed
      else if (user && !user.confirmed) {
        sendEmail(user.email, confirmation.email(user._id))
          .then(() => res.json({ message: messages.RESEND }))
          .catch(err => {
            res.json({ error: err });
            console.error(err);
          });
      }
      // user exists and is confirmed
      else if (user && user.confirmed) {
        res.json({ message: messages.PREVIOUSLY_CONFIRMED });
      }
      // unaccounted for state
      else {
        res.json({
          message: `Unaccounted for situation. Please email support!`
        });
        console.log(`Unaccounted for state`);
      }
    })
    .catch(err => console.error(err));
}

/**
 * The controller for confirming an email
 * The request includes the user's ID in the query parameters
 */
function confirmEmail(req, res) {
  const { id } = req.params;
  User.findById(id).then(user => {
    // if the user is not found
    if (!user) {
      res.json({ message: messages.NOT_FOUND });
    }
    // if the user's newly confirmed
    else if (user && !user.confirmed) {
      // mark the db as confirmed
      // let the user know
      User.findByIdAndUpdate(id, { confirmed: true })
        .then(() => res.json({ message: messages.CONFIRMED }))
        .catch(err => {
          res.json({ error: err });
          console.error(err);
        });
    }
    // if the user has already confirmed
    else if (user && user.confirmed) {
      res.json({ message: messages.PREVIOUSLY_CONFIRMED });
    }
    // unaccounted for state
    else {
      res.json({
        message: `Unaccounted for situation. Please email support!`
      });
      console.log(`Unaccounted for state`);
    }
  });
}

module.exports = {collectEmail, confirmEmail}