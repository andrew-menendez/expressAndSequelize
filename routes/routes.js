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
// router.get('/', boxService.getBoxes);

router.get('/', function(req, res, next){
  boxService.query(function(err, boxes){
  	console.log(boxes);
   res.render('index', { title:'hello',boxes:boxes});//
  });
});
// this doesn't work ^^, why??

router.get('/boxes',boxService.getBoxes);
router.post('/add',boxService.createBox);
router.post('/delete',boxService.removeBox);
router.post('/update',boxService.updateBoxes);

return router;

};




