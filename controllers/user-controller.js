const { User, Thought } = require("../models");

module.exports = {
  // get all Users
  getAllUser(req, res) {
    User.find({})
      .then((newUser) => res.json(newUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a single user by Id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .then((newUser) => {
        if (!newUser) {
          res.status(404).json({ message: "No user is found with this id!" });
          return;
        }
        res.json(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

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

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({
            message: "No user with this id!",
          });
        }
        Thought.deleteMany({ _id: { $in: deletedUser.thoughts } }).then(
          (result) => console.log(result)
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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

  // Delete friend from friends array
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friend } },
      { new: true }
    )
      .then((newUser) => res.json(newUser))
      .catch((err) => res.json(err));
  },
};
