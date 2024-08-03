const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name book"],
    },
    author: {
      type: String,
      required: [true, "Please provide a author"],
    },
    numberOfPages: {
      type: Number,
      required: [true, "Please provide your number of pages"],
    },
    photo: String,
    createDate: {
      type: Number,
      required: [true, "Please provide your number of create date"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Book must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.index({ user: 1 }, { unique: false });

// just get id
bookSchema.virtual("histories", {
  ref: "History",
  foreignField: "book",
  localField: "_id",
});

// get entrire object
bookSchema.pre(/^find/, function (next) {
  this.populate("histories");
  next();
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
