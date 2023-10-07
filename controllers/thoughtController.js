const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughtData = await Thought.find({})
        .populate('reactions', '-_id -__v')
        .select('-_id -__v');
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtData = await Thought.findById(req.params.thoughtId)
        .populate('reactions', '-_id -__v')
        .select('-_id -__v');
      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(404).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const userData = await User.findByIdAndUpdate(
        thoughtData.userId,
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;