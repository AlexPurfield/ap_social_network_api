const mongoose = require('mongoose');
const { User, Thought } = require('../models'); // Adjust the path to your models
const { userData, thoughtData } = require('./data');

mongoose.connect('mongodb://127.0.0.1:27017/socialnetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  try {
    // Clear the existing data in the database
    await User.deleteMany({});
    await Thought.deleteMany({});
    // await Reaction.deleteMany({});

    // Insert the new data into the database
    const users = await User.insertMany(userData);
    const thoughts = await Thought.insertMany(thoughtData);
 

    console.log('Data seeding complete.');
  } catch (err) {
    console.error('Data seeding failed:', err);
  } finally {
    mongoose.disconnect();
  }
});
