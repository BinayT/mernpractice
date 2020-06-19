const router = require("express").Router();

const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUser);

router.route("/add").post(userController.addAUser);

router.route("/:id").delete(userController.deleteAUser);

module.exports = router;
