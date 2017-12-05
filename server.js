const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening');
});
