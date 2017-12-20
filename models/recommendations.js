const mongoose = require('mongoose');
const User = require('./users.js');

const recommendationSchema = new mongoose.Schema({
  title: String,
  content: String,
  recomendee: String,
  date: String,
  username: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
