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
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userData = await User.findById(req.params.userId)
        .populate('thoughts friends', '-_id -__v')
        .select('-__v');
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create a new user.' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: 'Failed to update the user.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      await Thought.deleteMany({ username: userData.username });
      res.json({ message: 'User thoughts successfully deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
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
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to add friend to the user.' });
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
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to remove friend from the user.' });
    }
  }
};

module.exports = userController;


