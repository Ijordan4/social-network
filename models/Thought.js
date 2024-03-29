const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: mongoose.Schema.Types.ObjectId,
  reactionBody: {
    type: String,
    required: true,
    maxlength: 300,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
