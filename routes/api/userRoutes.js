const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users.' });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create a new user.' });
    }
  });

router.route('/:userId')
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the user.' });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update the user.' });
    }
  })
  .delete(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the user.' });
    }
  });

router.route('/:userId/friends/:friendId')
  .post(async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add friend to user.' });
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to remove friend from user.' });
    }
  });

module.exports = router;