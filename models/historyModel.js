const mongoose = require("mongoose");

const historyScheme = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please provide your content"],
  },
  from: Number,
  to: Number,
  pages: Number,
  tag: {
    type: String,
    required: [true, "Please provide your tag"],
  },
  createDate: {
    type: Number,
    required: [true, "Please provide your number of create date"],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, "History must belong to a book"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "History must belong to a user"],
  },
});

historyScheme.index({ book: 1, user: 1 }, { unique: false });

const History = mongoose.model("History", historyScheme);
module.exports = History;
