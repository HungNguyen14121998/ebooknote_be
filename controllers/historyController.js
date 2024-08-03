const History = require("./../models/historyModel");
const Book = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createHistory = catchAsync(async (req, res, next) => {
  const nameBook = req.body.nameBook;
  const userId = req.user._id;
  const book = await Book.findOne({ name: nameBook, user: userId });

  if (!book) {
    return next(new AppError("There is no book with book name.", 404));
  }

  const newHistory = History.create({
    user: req.user._id,
    book: book._id,
    content: req.body.content,
    from: req.body.from,
    to: req.body.to,
    pages: req.body.pages,
    tag: req.body.tag,
    createDate: req.body.createDate,
  });

  res.status(200).json({
    status: "success",
    data: {
      newHistory,
    },
  });
});

exports.updateHistory = catchAsync(async (req, res, next) => {
  const nameBook = req.body.nameBook;
  const book = await Book.findOne({ name: nameBook });

  if (!book) {
    return next(new AppError("There is no book with book name.", 404));
  }

  const userId = req.user._id;
  const bookId = book._id;
  const createDate = req.body.createDate;

  const historyUpdate = await History.findOne({
    user: userId,
    book: bookId,
    createDate: createDate,
  });

  if (!historyUpdate) {
    return next(new AppError("There is no history for update", 404));
  }

  const document = await History.findByIdAndUpdate(historyUpdate._id, {
    user: req.user._id,
    book: book._id,
    content: req.body.content,
    from: req.body.from,
    to: req.body.to,
    pages: req.body.pages,
    tag: req.body.tag,
    createDate: req.body.createDate,
  });

  res.status(200).json({
    status: "success",
    data: {
      document,
    },
  });
});

exports.deleteHistory = catchAsync(async (req, res, next) => {
  const nameBook = req.body.nameBook;
  const book = await Book.findOne({ name: nameBook });

  if (!book) {
    return next(new AppError("There is no book with book name.", 404));
  }

  const userId = req.user._id;
  const bookId = book._id;
  const createDate = req.body.createDate;

  const historyDelete = await History.findOne({
    user: userId,
    book: bookId,
    createDate: createDate,
  });

  if (!historyDelete) {
    return next(new AppError("There is no history for delete", 404));
  }

  const document = await History.findByIdAndDelete(historyDelete._id);

  res.status(200).json({
    status: "success",
    data: {
      document,
    },
  });
});
