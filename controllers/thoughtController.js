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
      res.status(500).json({ error: 'Failed to fetch thoughts. Please try again later.' });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtData = await Thought.findById(req.params.thoughtId)
        .populate('reactions', '-_id -__v')
        .select('-_id -__v');
      if (!thoughtData) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch the thought. Please try again later.' });
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
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create a new thought.' });
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
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: 'Failed to update the thought.' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thoughtData) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      const userData = await User.findByIdAndUpdate(
        thoughtData.userId,
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: 'Thought deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the thought.' });
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
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create a new reaction.' });
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
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to delete the reaction.' });
    }
  }
};

module.exports = thoughtController;