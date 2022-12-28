const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
} = require("../../controllers/user-controller");

// /api/ users
router.route("/").post(createUser).get(getAllUser);

// /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteUser);

module.exports = router;
