const router = require("express").Router();
const { createUser, updateUser } = require("../../controllers/user-controller");

// /api/ users
router.route("/").post(createUser);

// /api/users/:userId
router.route("/:userId").put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
