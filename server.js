//get dependencies

var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var app = express();

var port    =   process.env.PORT || 8080;
var morgan = require('morgan');// logger
var swig  = require('swig');// rendering engine

app.use(bodyParser());

// This is where all the Swig happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// connect to DB & initialize sequelize
var sql = new Sequelize('full_stack', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});


//Checking connection status
sql.authenticate().then(function(){
	console.log('connected to db');
}).catch(function(){
	console.log("fuck!");
}).done();

//new routes from the routes module
var routes = require('./routes/routes.js')(sql);





var boxService=require('./boxService.js')(sql)

//console.dir(boxService['createBox'])

//sync the model with the database
sql.sync().then(function() {
   app.use('/', routes);// now routes is a function that returns 'route object'
   app.listen(port);
});



