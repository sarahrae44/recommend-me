const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: 'recommendations rule',
  resave: false,
  saveUninitialized: false
}));

const recommendersController = require('./controllers/recommenders.js');
app.use('/recommenders', recommendersController);
const recommendationsController = require('./controllers/recommendations.js');
app.use('/recommendations', recommendationsController);

const sessionsController =
require('./controllers/session.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(express.static('public'));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/i-recommend'
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening');
});
