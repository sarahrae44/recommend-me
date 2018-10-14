const mongoose = require('mongoose');
const Recommendations = require('./recommendations.js');

const userSchema = new mongoose.Schema({
 username: { type: String, unique: true },
 password: String,
 photo: String
 recommendations: [Recommendations.schema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
