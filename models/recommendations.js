const mongoose = require('mongoose');
const User = require('./users.js');

const recommendationSchema = mongoose.Schema({
  title: String,
  content: String,
  recomendee: String,
  date: String,
  userId: [User.schema]
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
