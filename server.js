//get dependencies

var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser());


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





//console.dir(Box);
var boxService=require('./boxService.js')(sql)

//console.dir(boxService['createBox'])

//sync the model with the database
sql.sync().then(function() {
   
   app.get('/boxes',boxService.getBoxes);
   app.post('/boxes',boxService.createBox)
   app.listen(8080);
});



// app.get('/', function(req,res){
// 	res.send({name:"hello earth"})});
