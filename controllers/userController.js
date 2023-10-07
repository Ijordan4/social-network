const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({})
        .populate('thoughts friends', '-_id -__v')
        .select('-__v');
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const userData = await User.findById(req.params.userId)
        .populate('thoughts friends', '-_id -__v')
        .select('-__v');
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(404).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Thought.deleteMany({ username: userData.username });
      res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
};

module.exports = userController;