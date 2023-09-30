const {User, Thought} = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
              .select('-__v');
            
            if (!thought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json('Created the thought!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            const user = await User.findByIdAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: {thoughts: req.params.thoughtId} },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json({ message: 'Thought successfully deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true},
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },  
} 