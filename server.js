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
  saveUninitialized: false
}));

const recsController = require('./controllers/recs.js');
app.use('/recs', recsController);

const sessionsController =
require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(express.static('public'));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recletters'
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening');
});
