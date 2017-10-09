'use strict';

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/express_sequelize_enrichment', {logging: false});

var Award = db.define('award', {
  name: Sequelize.STRING,
})

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  getterMethods: {
    idk: function(){}
  }
})

User.removeUser = function(id){
  return User.findById(id)
  .then(function(userToRemove){
    userToRemove.destroy({})
  })
  .catch(function(err){
    console.log(err)
  })
}

User.updateUser = function(id, body) {
  return User.findById(id)
  .then(function(userToUpdate) {
    return userToUpdate.update(body)
  })
  .catch(function(err) {
    console.log(err)
  })
}

User.addAward = function(id){
  return User.findById(id)
  .then(function (userToAddAward){
    return Award.create({
      where: {
        name: 'Sample Award'
        // userId: userToAddAward.id
      }
    })
  })
  .then(function(updatedUser){
    return User.findById(id);
  })
  .catch(function(err){
    console.log(err);
  })
};

User.removeAward = function(userId, awardId){
  return Award.findById(awardId)
  .then(function(awardToDelete) {
    return awardToDelete.destroy()
  })
  .then(function(){
    return User.findById(userId)
  })
  .catch(function(err){
    console.log(err);
  })
}

User.addMentor = function(userId, mentorId){
  return User.findById(userId)
  .then(function(userToAddMentor){
    return userToAddMentor.update({
        "mentorId": mentorId
      })
  })
  .catch(function(err){
    console.log(err)
  })
}

User.removeMentor = function(userId, mentorId){
  return User.findById(userId)
  .then(function(userToDeleteMentor){
    return userToDeleteMentor.update({
        "mentorId": null
      })
  })
  .catch(function(err){
    console.log(err)
  })
}

// associations:
User.hasOne(User, {as:'mentor'})  //adds mentorId to User
User.hasOne(Award)


db.sync({force: false})
.then(function(data){
  console.log('database has been synced!')
})
.catch(function(err){
  console.error(err);
});

module.exports = {User, Award}
