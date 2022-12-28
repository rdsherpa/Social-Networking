const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");
const reactionSchema = require("./Reaction");

// Schema to create Thought mode
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => formatDate(timeStamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
