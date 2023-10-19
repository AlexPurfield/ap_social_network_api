const Thought = require("../models/Thought");

module.exports = {
  //get all thoughts route controller (get)
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get single thought with Id route controller (get)
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create new thought route controller (post)
  async createThought(req, res) {
    try {
      const newThoughtData = await Thought.create(req.body);
      res.json(newThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update (put) thought route controller
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought with that Id",
        });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete thought route controller (delete)
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }

  
      await Thought.updateMany(
        { reactions: req.params.thoughtId },
        { $pull: { reactions: req.params.thoughtId } }
      );

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // react (reply) to thought route controller (post reaction)
  async addReactionToThought(req, res) {
    try {
      const reaction = await Thought.FindOneandUpdate(
        { _id: req.params.thoughtId },
        { $addtoSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({
          message: "No thought with that Id",
        });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete reaction from thought route controller (delete)
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No reaction with that Id",
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
