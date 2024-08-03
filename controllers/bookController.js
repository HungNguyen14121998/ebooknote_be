const multer = require("multer");
const sharp = require("sharp");
const Book = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("file");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const bookName = req.file.originalname;

  req.file.filename = `${req.user._id}-${bookName
    .toLowerCase()
    .replace(/\s/g, "")}.jpeg`;

  await sharp(req.file.buffer)
    .resize(360, 440)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/books/${req.file.filename}`);

  next();
});

exports.updateImageToBook = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const bookName = req.file.originalname;
  const userId = req.user._id;

  const bookUpdate = await Book.findOne({
    user: userId,
    name: bookName,
  });

  const document = await Book.findByIdAndUpdate(bookUpdate._id, {
    photo: `img/books/${req.file.filename}`,
  });

  res.status(200).json({
    status: "success",
    data: document,
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const book = Book.findOne({ name: req.body.name });

  if (book != nil) {
    return next(new AppError("Book is exist", 401));
  }

  const newBook = Book.create({
    user: req.user._id,
    name: req.body.name,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    createDate: req.body.createDate,
  });

  res.status(200).json({
    status: "success",
    data: {
      newBook,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const books = await Book.find({ user: userId });

  if (!books) {
    return next(new AppError("There is no book with user.", 404));
  }

  res.status(200).json({ data: books });
});
