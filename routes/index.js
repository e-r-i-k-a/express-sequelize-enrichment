const router = require('express').Router();
const models = require('../models/database.js');
const User = models.User;
const Award = models.Award
const bluebird = require('bluebird')

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
  User.create(req.body)
    .then(function(createdUser) {
      res.json(createdUser);
    })
    .catch(next);
});

//DELETE
router.delete('/:id', (req, res, next)=> {
  User.removeUser (Number(req.params.id))
    .then(res.json('User has been removed!'))
    .catch( next);
});

//UPDATE
router.put('/:id', (req, res, next)=> {
  User.updateUser (Number(req.params.id), req.body)
    .then(function(updatedUser) {
      res.json(updatedUser)
    })
    .catch(next);
});

//CREATE AWARD
router.post('/:id/awards', (req, res, next)=> {
  User.addAward(Number(req.params.id))
    .then(function(updatedUserWithAward) {
      res.json(updatedUserWithAward)
    })
    .catch(next);
});

//DELETE AWARD
router.delete('/:userId/awards/:id', (req, res, next)=> {
  User.removeAward(req.params.userId, req.params.id)
    .then(function(updatedUser){
      res.json(updatedUser)
    })
    .catch( next);
});

module.exports = router;
