const mongoose = require('mongoose');
const Rec = require('./recs.js');

const userSchema = new mongoose.Schema({
 username: String,
 password: String,
 photo: String,
 recs: [Rec.schema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
