const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('users/login.ejs', { message:
  req.session.message || ''})
})

router.get('/register', (req, res) => {
  res.render('users/register.ejs', {})
})

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        console.log(req.session);
        res.redirect('/recommenders')
      } else {
        req.session.message = 'username or password are incorrect';
        res.redirect('/sessions/login')
      }
    } else {
      req.session.message = 'username or password are incorrect';
      res.redirect('/sessions/login')
    }
  })
})

router.post('/registration', (req, res) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user) => {
    console.log(user);
    req.session.message = '';
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/recommenders')
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){

    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;
