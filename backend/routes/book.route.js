const expess = require("express");
const contacts = require("../controllers/book.controller");

const router = expess.Router();

router
  .route("/")
  .get(contacts.findAll)
  .post(contacts.create)
  .delete(contacts.deleteAll);
router
  .route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;
