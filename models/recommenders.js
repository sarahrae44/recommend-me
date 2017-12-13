const mongoose = require('mongoose');
const Recommendation = require('./recommendations.js');

const recommenderSchema = mongoose.Schema({
  name: String,
  recommendations: [Recommendation.schema]
});

const Recommender = mongoose.model('Recommender', recommenderSchema);

module.exports = Recommender;
