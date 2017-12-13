const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 username: { type: String, unique: true },
 password: String,
 photo: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
