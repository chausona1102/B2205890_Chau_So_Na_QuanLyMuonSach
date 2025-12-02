const express = require("express");
const router = express.Router();
const nhaXuatBanController = require("../controllers/publisher.controller");

router.post("/", nhaXuatBanController.create);
router.get("/", nhaXuatBanController.findAll);
router.get("/:id", nhaXuatBanController.findOne);
router.put("/:id", nhaXuatBanController.update);
router.delete("/:id", nhaXuatBanController.delete);
router.delete("/", nhaXuatBanController.deleteAll);

module.exports = router;
