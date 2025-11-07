const expess = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/book.route");
const ApiError = require("./app/api-error");
const app = expess();

app.use(cors());
app.use(expess.json());

app.use("/api/books", bookRoutes);
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
module.exports = app;
