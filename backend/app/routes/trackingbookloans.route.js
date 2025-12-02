const express = require("express");
const controller = require("../controllers/trackingbookloans.controller");

const router = express.Router();

router.route("/").get(controller.findAll).post(controller.create);

router
  .route("/:id")
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete);

router.get("/madocgia/:MaDocGia", controller.findByMaDocGia);

module.exports = router;
