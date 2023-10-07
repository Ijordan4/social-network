const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controller/userController');
const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../controller/thoughtController');

// User routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
router.post('/users/:userId/friends/:friendId', addFriend);
router.delete('/users/:userId/friends/:friendId', removeFriend);

// Thought routes
router.get('/thoughts', getAllThoughts);
router.post('/thoughts', createThought);
router.get('/thoughts/:thoughtId', getThoughtById);
router.put('/thoughts/:thoughtId', updateThought);
router.delete('/thoughts/:thoughtId', deleteThought);
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions', deleteReaction);

module.exports = router;
