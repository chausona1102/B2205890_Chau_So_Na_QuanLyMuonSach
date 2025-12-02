const express = require("express");
const router = express.Router();
const docgia = require("../controllers/reader.controller");

router.post("/", docgia.create);
router.get("/", docgia.findAll);
router.get("/:id", docgia.findOne);
router.put("/:id", docgia.update);
router.delete("/:id", docgia.delete);
router.delete("/", docgia.deleteAll);

module.exports = router;
