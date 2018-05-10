const mongoose = require('mongoose');
var Animal = require('../models/animal')

module.exports.index = function(req, res){
    Animal.find({}, function(err, animals) {
        res.render('index', {animals: animals});
      }) 
}

module.exports.mongooses = function(req, res){
    res.render('create');
}
module.exports.mongooseID = function(req, res){
Animal.findById(req.params.id, function(err, animals){
    if (err) {
      console.log("Error: ", err)
      for(var key in err.errors){
          req.flash('errors', err.errors[key].message);
      }
      res.redirect('/');
  }
  else {
      res.render('specific_animal', {animals: animals})
  }
})
}
module.exports.edit = function(req, res){
    Animal.findById(req.params.id, function(err, animals){
        if (err) {
          console.log("Error: ", err)
          for(var key in err.errors){
              req.flash('errors', err.errors[key].message);
          }
          res.redirect('/');
      }
      else {
          res.render('edit', {animals: animals})
      }
    })
}

module.exports.postroute = function(req, res){
    console.log("POST DATA", req.body);
        var animal = new Animal({animal: req.body.animal});
        animal.save(function(err) {
          console.log("hello");
          if(err) {
            console.log("Error: ", err)
          for(var key in err.errors){
              req.flash('errors', err.errors[key].message);
          }
            res.redirect("/");
          } else { 
            res.redirect('/');
          }
        })
}

module.exports.postID = function(req, res){
    var animal = Animal.update({_id: req.params.id}, {animal: req.body.animal}, function(err){
        if(err) {
          console.log("Error: ", err)
        for(var key in err.errors){
            req.flash('errors', err.errors[key].message);
        }
          res.redirect("/");
        } else { 
          res.redirect('specific_animal');
        }
      })
}

module.exports.destroy = function(req, res){
    Animal.findByIdAndRemove(req.params.id, function(err, animals){
        if (err) {
          console.log("Error: ", err)
          for(var key in err.errors){
              req.flash('errors', err.errors[key].message);
          }
          res.redirect('/');
      }
      else {
        res.redirect('/');
      }
    })
}


