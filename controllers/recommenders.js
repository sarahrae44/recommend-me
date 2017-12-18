const express = require('express');
const Recommender = require('../models/recommenders.js');
const Recommendation = require('../models/recommendations.js');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.session, 'this is a req.session in the route /recommenders')
  Recommender.find({}, (err, foundRecommenders) => {
    res.render('recommenders/index.ejs', {
      recommenders: foundRecommenders
    });
  })
});

router.post('/', (req, res) => {
  Recommender.create(req.body, (err, createdRecommender) => {
    res.redirect('/recommenders');
  });
});

router.get('/new', (req, res) => {
  res.render('recommenders/new.ejs');
});

router.get('/:id', (req, res) => {
  Recommender.findById(req.params.id, (err, foundRecommender) => {
    res.render('recommenders/show.ejs', {
      recommender: foundRecommender
    });
  });
});

router.delete('/:id', (req, res) => {
  Recommender.findByIdAndRemove(req.params.id, (err, foundRecommender) => {
    const recommendationIds = [];
    for(let i = 0; i < foundRecommender.recommendations.length; i++) {
      recommendationIds.push(foundRecommender.recommendations[i]._id);
    }
    Recommendation.remove({ _id: {
        $in: recommendationIds
      }
    }, (err, data) => {
      res.redirect('/recommenders');
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Recommender.findById(req.params.id, (err, foundRecommender) => {
    res.render('recommenders/edit.ejs', {
      recommender: foundRecommender
    });
  });
});

router.put('/:id', (req, res) => {
  Recommender.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/recommenders');
  });
});

module.exports = router;
