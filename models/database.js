'use strict';

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/express_sequelize_enrichment');

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // mentor: {
  //   type: Sequelize.STRING,
  //   defaultValue: null
  // }
}, {
  getterMethods: {
    idk: function(){}
  }
})

var Award = db.define('award', {
  name: Sequelize.STRING,
})

//class methods:
// User.addUser = function(input){
//   User.create({
//     where: {
//       name: input.name
//     }
//   })
//   .then(function(){})
//   .catch(function(err){
//     console.log(err);
//   })
// }

User.removeUser = function(id){
  return this.destroy()
  .then(function(){})
  .catch(function(err){
    console.log(err)
  })
}

User.addMentor = function(input){
  this.update({
    mentor: input.name,
  })
  .then(function(updated){
    return updated;
  })
  .catch(function(err){
    console.log(err)
  })
}

User.removeMentor = function(){
  return this.destroy()
  .then(function(){})
  .catch(function(err){
    console.log(err);
  })
}

User.addAward = function(input){
  Award.create({
    where: {
      name: input.name,
      userId: this.id
    }
  })
  .then(function(){})
  .catch(function(err){
    console.log(err);
  })
};

User.removeAward = function(){
  return this.destroy()
  .then(function(){})
  .catch(function(err){
    console.log(err);
  })
}

User.findPotentialMentors = function(){
  User.findAll({
    where: {
      UserId: {
        [Op.ne]: this.id
      }
    }
  })
  .then(function(){})
  .catch(function(err){
    console.log(err);
  })
}

//associations:
User.hasOne(User, {as:'mentor'})  //adds mentorId to User
Award.belongsTo(User, {as: 'award'}) //adds userId to award
User.hasMany(Award);



User.sync({force: false})
.then(function(data){
  console.log('database has been synced!')
})
.catch(function(err){
  console.error(err);
});

module.exports = {User, Award}

//change mentor
//generate award
//remove award
//check wikistack: e.g. findbytag, seed data
// db.myClassMethod = function(userID){};

//user can have a mentor
//user can mentor several people
//mentor can have several mentees
//you can't be your own mentor

//routes
  // /:userId/awards/:id
  // /
//homepage
//users
