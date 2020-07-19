const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");

const accountRouter = require("./routes/authRoutes");
const detachmentRouter = require("./routes/detachmentRoutes");
const employeeRouter = require("./routes/employeeRoutes");

const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();

app.use(cors());
app.options("*", cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * @description - Catch not found routes
 * const err = new Error(`Can't find ${req.originalUrl} on this server);
 * err.status = 'fail';
 * err.statusCode = 404;
 * next(err);
 */
// app.get("/api/error", (req, res, next) => {
//   next(
//     new AppError("Invalid input", 401, [
//       {
//         field: "password",
//         message: "Password require's 8 Character",
//       },
//       {
//         field: "username",
//         message: "Username already exists",
//       },
//     ])
//   );
// });

app.use("/api/v1/account", accountRouter);
app.use("/api/v1/detachment", detachmentRouter);
app.use("/api/v1/employee", employeeRouter);

// Load Frontend
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// API Errors
app.use(globalErrorHandler);

module.exports = app;
