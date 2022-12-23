const { User } = require("../models");

module.exports = {
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({
              message: "No user with this id!",
            })
          : res.json(updatedUser)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then(updatedUser);
    !updatedUser
      ? res.status(404).json({
          message: "No user with this id!",
        })
      : res.json(updatedUser).catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
  },
};
