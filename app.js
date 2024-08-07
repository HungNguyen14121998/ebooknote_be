var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./utils/appError");

///
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://hhnguyenit:cEXYWtJvQMbAwPF8@cluster0.toedfzq.mongodb.net/ebooknote?retryWrites=true&w=majority&appName=Cluster0";
///

var app = express();

const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");
const historyRouter = require("./routers/historyRouter");

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(mongoSanitize());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/history", historyRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("Connect database success");
  });

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
