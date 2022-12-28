const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThought) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get a single thought by Id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId }).then((dbThought) => {
      if (!dbThought) {
        res.status(404).json({ message: "No Thought is found with this id!" });
      }
    });
  },

  // POST  a new Thought
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((newUser) => {
        if (!newUser) {
          res.status(404).json({ message: "No user is found with this id!" });
        }
        res.json(newUser);
      })
      .catch((err) => res.json(400).json(err));
  },

  // Create reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought is found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // PUT update a Thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThought) => {
        if (!dbThought) {
          res
            .status(404)
            .json({ message: "No Thought is found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE reaction to a thought
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.json(err));
  },

  // DELETE Thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        console.log(deletedThought);
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought is found with this id" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } }
        );
      })
      .then((newUser) => {
        if (!newUser) {
          res.status(202).json({ message: "Deleted!" });
          return;
        }
      })
      .catch((err) => res.json(err));
  },
};
