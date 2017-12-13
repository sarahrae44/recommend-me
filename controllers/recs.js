const express = require('express');
const router= express.Router();
const Rec = require('../models/recs.js');
const User = require('../models/users.js');

router.get('/', (req, res) => {
  res.render('recs/index.ejs')
});

router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.render('recs/new.ejs', {
      users: allUsers
    });
  });
});

router.post('/', (req, res) => {
  Rec.create(req.body, (err, createdRec) => {
    res.redirect('/recs');
  });
});

module.exports = router;
