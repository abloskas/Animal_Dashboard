var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

//session
const flash = require('express-flash');
app.use(flash());
var session = require('express-session');
app.use(session({
  secret: 'keyboardkittehohhhhhhyyeaaaahhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_dashboard');

var AnimalSchema = new mongoose.Schema({
    animal: String
})
mongoose.model('Animal', AnimalSchema); 
var Animal = mongoose.model('Animal');

// Use native promises
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');


// Routes

app.get('/', function(req, res) {
    Animal.find({}, function(err, animals) {
        res.render('index', {animals: animals});
      }) 
})

app.get('/mongooses/new', function(req, res){
  res.render('create');
})

app.get('/mongooses/:id', function(req, res){
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
})

app.get('/mongooses/:id/edit', function(req, res){
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
})

app.post('/mongooses', function(req, res) {
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
  })  

  app.post('/mongooses/:id', function(req, res) {
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
    });
   
      

  app.get('/mongooses/:id/destroy', function(req, res){
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
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
