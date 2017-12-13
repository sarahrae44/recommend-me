const mongoose = require('mongoose');

const recSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  recomendee: { type: String, required: true},
  date: { type: String, required: true}
});

const Rec = mongoose.model('Rec', recSchema);

module.exports = Rec;
