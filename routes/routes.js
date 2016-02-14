var express = require('express');
var router = express.Router();

var server=require('./../server.js')





var bodyParser = require('body-parser');// this is for the forms
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });



module.exports = function (sql) {

router.use(express.static('stylesheets'));

var boxService=require('./../boxService.js')(sql);

//console.dir(boxService);

//home page route.... 
router.get('/', boxService.getBoxes);

router.get('/boxes',boxService.query);
router.post('/boxes',boxService.createBox)


return router;

};




