
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
  name: String,
  bio: String,
  skills: String,
  years: String,
  why: String
});

var dataModel = mongoose.model("submissions", dataSchema);

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/teamteja");


//renders the index page
app.get('/', function (req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function (req, res){
  dataModel.find({}, function (err, docs) {
    console.log(docs);
    res.render('applicants', {data: docs}); 
  });
});

//confirm form submission
app.get("/formsent", function (req, res){
  res.send("Your application has been submitted");
});

// creates an applicant
app.post('/applicant', function (req, res){
  console.log(req.body);
  var newSub = new dataModel(req.body);
  newSub.save();
  res.redirect("/formsent");
});

//deletes an applicant
app.get("/delete/:id", function (req, res) {
  dataModel.remove({_id: req.params.id}, function (err, doc) {
    res.redirect("/applicants");
  });
});

//view single applicant
app.get("/app/:id", function (req, res) {
  dataModel.find({_id: req.params.id}, function (err, doc) {
    console.log(doc);
    res.render("viewSingle", doc[0]);
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
