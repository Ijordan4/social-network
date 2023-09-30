const {User} = require('../models');

module.exports = {
    async getAllUser (req, res) {
        try {
            const user = await User.find()
            .populate('thoughts')
            .select('-__v');
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser (req, res) {
        try {
            const user = await User.findOne()
              .populate('thoughts')
              .populate('friends')
              .select('-__v');

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser (req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend (req, res) {
        try {
            const user = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId }},
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: "No User found with this ID" });
            } 

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
} 