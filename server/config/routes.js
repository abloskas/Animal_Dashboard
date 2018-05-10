var mongoose = require('mongoose');
const animals = require('../controllers/animals');
var Animal = mongoose.model('Animal');

module.exports = function(app){
    
    app.get('/', function(req, res) {
        animals.index(req, res);
    })
    // done
    
    app.get('/mongooses/new', function(req, res){
      animals.mongooses(req, res);
    })
    //done 

    app.get('/mongooses/:id', function(req, res){
        animals.mongooseID(req, res);
    })
    //done 
    
    app.get('/mongooses/:id/edit', function(req, res){
       animals.edit(req, res);
    })
    //done 

    app.post('/mongooses', function(req, res) {
        animals.postroute(req, res);
      })  
    // done
    
      app.post('/mongooses/:id', function(req, res) {
        animals.postID(req, res);
        });
       //done
          
    
      app.get('/mongooses/:id/destroy', function(req, res){
        animals.destroy(req, res);
    })
}