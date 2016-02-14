// logic for data access

var Sequelize= require('sequelize');

module.exports= function(sql){

	var model=require('./model.js')(sql);//remember to pass in the db instance var
	var Box=model.Box;

return {
		createBox : function (req, res) {
			console.log(req.body);
		    var newBox={
		        name: req.body.name,
		        color:req.body.color
		    }
		    Box.create(newBox).then(function () {
		        res.send(200);
		    });
		},

		getBoxes : function (req, res) {
			var titles=['hello','myBoxes'];
		    Box.findAll(
		    	{
				attributes:['name','color'],
				order:'createdAt DESC'

				}).then(function (boxes) {
				//console.log(boxes)
				res.render('index', { title:titles[2],
						 boxes:boxes});// tell render engine to render the html
		    });
		},
		query : function (req, res) {
		    Box.findAll().then(function (boxes) {
		       res.send(boxes);
		    });
		}
	};//end return
};


