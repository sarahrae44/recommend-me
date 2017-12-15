const mongoose = require('mongoose');
const Recommendation = require('./recommendations.js');

const userSchema = new mongoose.Schema({
 username: { type: String, unique: true },
 password: String,
 photo: String,
 // recommendations: String,
 // [Recommendation.schema],
 recommendationsWritten: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
