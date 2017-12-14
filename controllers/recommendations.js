const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendations.js');
const Recommender = require('../models/recommenders.js');

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
  Recommender.find({}, (err, allRecommenders) => {
    res.render('recommendations/new.ejs', {
      recommenders: allRecommenders
    });
  });
});

router.post('/', (req, res) => {
  Recommender.findById(req.body.recommenderId, (err, foundRecommender) => {
    Recommendation.create(req.body, (err, createdRecommendation) => {
      foundRecommender.recommendations.push(createdRecommendation);
      foundRecommender.save((err, data) => {
        res.redirect('/recommendations');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Recommendation.findById(req.params.id, (err, foundRecommendation) => {
    Recommender.findOne({'recommendations._id': req.params.id}, (err, foundRecommender) => {
      res.render('recommendations/show.ejs', {
        recommender: foundRecommender,
        recommendation: foundRecommendation
      });
    })
  });
});

router.delete('/:id', (req, res) => {
  Recommendation.findByIdAndRemove(req.params.id, (err, foundRecommendation) => {
    Recommender.findOne({'recommendations._id':req.params.id}, (err, foundRecommender) => {
      foundRecommender.recommendations.id(req.params.id).remove();
      foundRecommender.save((err, data) => {
        res.redirect('/recommendations');
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Recommendation.findById(req.params.id, (err, foundRecommendation) => {
    Recommender.find({}, (err, allRecommenders) => {
      Recommender.findOne({'recommendations._id': req.params.id}, (err, foundRecommendationRecommender) => {
        res.render('recommendations/edit.ejs', {
          recommendation: foundRecommendation,
          recommenders: allRecommenders,
          recommendationRecommender: foundRecommendationRecommender
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRecommendation) => {
    Recommender.findOne({'recommendations._id': req.params.id}, (err, foundRecommender) => {
      if(foundRecommender._id.toString() !== req.body.recommenderId){
        foundRecommender.recommendations.id(req.params.id).remove();
        foundRecommender.save((err, savedFoundRecommender) => {
          Recommender.findById(req.body.recommenderId, (err, newRecommender) => {
            newRecommender.recommendations.push(updatedRecommendation);
            newRecommender.save((err, savedNewRecommender) => {
              res.redirect('/recommendations/'+req.params.id);
            });
          });
        });
      } else {
        foundRecommender.recommendations.id(req.params.id).remove();
        foundRecommender.recommendations.push(updatedRecommendation);
        foundRecommender.save((err, data) => {
          res.redirect('/recommendations/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
