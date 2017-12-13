const express = require('express');
const router= express.Router();
const Rec = require('../models/recs.js');
const User = require('../models/users.js');

router.get('/', (req, res) => {
  if(req.session.logged){
    Rec.find({}, (err, foundRecs) => {
      res.render('recs/index.ejs', {
        recs: foundRecs
      });
    });
  } else {
    res.redirect('/sessions/login')
  }
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

router.get(':/id', (req, res) => {
  Rec.findById(req.params.id, (err, foundRec) => {
    User.findOne({'recs._id': req.params.id}, (err, foundUser) => {
      res.render('recs/show.ejs', {
        user: foundUser,
        rec: foundRec
      });
    })
  });
});

module.exports = router;
