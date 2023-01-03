const router = require("express").Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/ thoughts
router.route("/").post(createThought).get(getAllThoughts);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").put(addReaction);

router.route("/:thoughtId/:reactionId").put(deleteReaction);

module.exports = router;
