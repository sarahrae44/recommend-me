const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema({
  title: String,
  content: String,
  recomendee: String,
  date: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
