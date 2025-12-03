const express = require("express");
const router = express.Router();
const sach = require("../controllers/sach.controller");

router.post("/", sach.create);
router.get("/", sach.findAll);
router.get("/:id", sach.findOne);
router.put("/:id", sach.update);
router.delete("/:id", sach.delete);
router.delete("/", sach.deleteAll);
router.get("/timkiem", sach.search);
router.put("/capnhatsoluong/:id", sach.truSoLuong);

module.exports = router;
