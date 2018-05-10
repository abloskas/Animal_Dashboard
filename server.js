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


app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');


// Routes moved to routes.js
require('./server/config/routes.js')(app)

//mongoose.js in config
require("./server/config/mongoose");



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
