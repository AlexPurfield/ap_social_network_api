const User = require("../models/User");

module.exports = {
  //get all users route controller
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },

  // get single user with Id route controller
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      }).select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create new user route controller
  async createUser(req, res) {
    try {
      const newUserData = await User.create(req.body);
      res.json(newUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update user route controller
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete user route controller
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }
      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId } }
      );

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add friend route controller
  async createFriend(req, res) {
    try {
      const userFriend = await User.FindOneandUpdate(
        { _id: req.params.userId },
        { $addtoSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!userFriend) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete friend route controller
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No friend with that Id",
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
