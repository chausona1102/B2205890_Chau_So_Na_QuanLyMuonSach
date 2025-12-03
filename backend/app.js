const express = require("express");
const cors = require("cors");
const nhaXuatBanRoute = require("./app/routes/nhaxuatban.route");
const nhanvienRoute = require("./app/routes/nhanvien.route");
const sachRoute = require("./app/routes/sach.route");
const docgiaRoute = require("./app/routes/docgia.route");
const muonsachRoute = require("./app/routes/theodoimuonsach.route");
const login = require("./app/routes/auth.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/nhaxuatban", nhaXuatBanRoute);
app.use("/api/nhanvien", nhanvienRoute);
app.use("/api/sach", sachRoute);
app.use("/api/docgia", docgiaRoute);
app.use("/api/muonsach", muonsachRoute);
app.use("/api/login", login);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library application." });
});

app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
