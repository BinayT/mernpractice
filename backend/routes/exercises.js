const router = require("express").Router();

const exerciseController = require("../controllers/exerciseController");

router.route("/").get(exerciseController.getAllExercises);

router.route("/add").post(exerciseController.createExercise);

router
  .route("/:id")
  .get(exerciseController.getAExercise)
  .delete(exerciseController.deleteAExercise);

router.route("/update/:id").patch(exerciseController.updateExercise);

module.exports = router;
