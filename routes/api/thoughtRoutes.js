const express = require('express');
const { Thought } = require('../models');
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch thoughts.' });
    }
  })
  .post(async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create a new thought.' });
    }
  });

module.exports = router;
