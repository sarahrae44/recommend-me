const mongoose = require('mongoose');
const User = require('./users.js');

const recommendationSchema = new mongoose.Schema({
  title: String,
  content: String,
  // recommenderEmail: String,
  // recommenderName: String,
  requestNote: String,
  date: String,
  username: String,
  recommendee: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
