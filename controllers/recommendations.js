const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendations.js');
// const Recommender = require('../models/recommenders.js');
const User = require('../models/users.js');

router.get('/', (req, res) => {
  if(req.session.logged){
    Recommendation.find({}, (err, foundRecommendations) => {
      res.render('recommendations/index.ejs', {
        recommendations: foundRecommendations
      });
    })
  } else {
    res.redirect('/sessions/login')
  }
});

router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.render('recommendations/new.ejs', {
      users: allUsers
    });
  });
});

router.post('/', (req, res) => {
  User.findById(req.body.userId, (err, foundUser) => {
    Recommendation.create(req.body, (err, createdRecommendation) => {
      foundUser.recommendations.push(createdRecommendation);
      foundUser.save((err, data) => {
        res.redirect('/recommendations');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Recommendation.findById(req.params.id, (err, foundRecommendation) => {
    User.findOne({'recommendations._id': req.params.id}, (err, foundUser) => {
      res.render('recommendations/show.ejs', {
        user: foundUser,
        recommendation: foundRecommendation
      });
    })
  });
});

router.delete('/:id', (req, res) => {
  Recommendation.findByIdAndRemove(req.params.id, (err, foundRecommendation) => {
    User.findOne({'recommendations._id':req.params.id}, (err, foundUser) => {
      foundUser.recommendations.id(req.params.id).remove();
      foundUser.save((err, data) => {
        res.redirect('/recommendations');
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Recommendation.findById(req.params.id, (err, foundRecommendation) => {
    User.find({}, (err, allUsers) => {
      User.findOne({'recommendations._id': req.params.id}, (err, foundRecommendationUser) => {
        res.render('recommendations/edit.ejs', {
          recommendation: foundRecommendation,
          users: allUsers,
          recommendationUser: foundRecommendationUser
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRecommendation) => {
    User.findOne({'recommendations._id': req.params.id}, (err, foundUser) => {
      if(foundUser._id.toString() !== req.body.userId){
        foundUser.recommendations.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser) => {
          User.findById(req.body.userId, (err, newUser) => {
            newUser.recommendations.push(updatedRecommendation);
            newUser.save((err, savedNewUser) => {
              res.redirect('/recommendations/'+req.params.id);
            });
          });
        });
      } else {
        foundUser.recommendations.id(req.params.id).remove();
        foundUser.recommendations.push(updatedRecommendation);
        foundUser.save((err, data) => {
          res.redirect('/recommendations/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
