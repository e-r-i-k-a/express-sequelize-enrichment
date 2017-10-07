const router = require('express').Router();
const models = require('../models/database.js');
const User = models.User;
const Award = models.Award
const bluebird = require('bluebird')

const redirect = (res)=> {
  return ()=> {
    res.redirect('/users');
  };
};

//READ
var allData = {};

router.get('/api', (function(req, res, next) {
  var dbRetrieval = [
    User.findAll()
    .then(function(users) {
      allData.Users = users;
    }),
    Award.findAll()
    .then(function(award) {
      allData.award = award;
    })
  ]
  Promise.all(dbRetrieval)
  .then (function(data) {
    res.status(200).json(allData);
  })
  .catch(next)
}))

//CREATE
router.post('/', (req, res, next)=> {
  console.log(req.body)
  User.create(req.body)
    .then(function(createdUser) {
      res.json(createdUser);
    })
    .catch(next);
});

//DELETE
router.delete('/:id', (req, res, next)=> {
  User.destroyById(req.params.id)
    .then(redirect(res))
    .catch( next);
});

//UPDATE
router.put('/:id', (req, res, next)=> {
  User.updateUserFromRequestBody(req.params.id, req.body)
    .then(redirect(res))
    .catch(next);
});

//CREATE AWARD
router.post('/:id/awards', (req, res, next)=> {
  User.generateAward(req.params.id)
    .then(redirect(res))
    .catch(next);
});

//DELETE AWARD
router.delete('/:userId/awards/:id', (req, res, next)=> {
  User.removeAward(req.params.userId, req.params.id)
    .then(redirect(res))
    .catch( next);
});

module.exports = router;
