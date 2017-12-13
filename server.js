const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: 'recommendationsrule',
  resave: false,
  saveUnitialized: false
}));

const sessionsController =
require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(express.static('public'));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recs'
mongoose.connect(mongoUri);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening');
});
