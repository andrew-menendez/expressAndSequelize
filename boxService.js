// logic for data access

var Sequelize= require('sequelize');

module.exports= function(sql){

	var model=require('./model.js')(sql);//remember to pass in the db instance var
	var Box=model.Box;

return {
		createBox : function (req, res) {
		    var newBox={
		        name: req.body.name,
		        color:req.body.color
		    }
		    Box.create(newBox).then(function () {
		        res.send(200);
		    });
		},

		getBoxes : function (req, res) {
		    Box.findAll().then(function (boxes) {
		       res.send(boxes);
		    });
		}
	};//end return
};


