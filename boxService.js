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
		        //res.sendStatus(200)
		        res.redirect('/boxes');
		    });
		},

		getBoxes : function (req, res) {
			
		    Box.findAll(
		    	{
				attributes:['name','color'],
				order:'createdAt DESC'

				}).then(function (boxes) {
				//console.log(boxes)
				res.render('index', { title:'Boxes!',
						 boxes:boxes});// tell render engine to render the html
		    });
		},
		query : function (callBack) { /// this is my callback version that doesn't work

		    Box.findAll().then( function(boxes){
		    	//console.log(boxes);
		    	callBack(boxes);
		    })
		},
		removeBox: function(req,res){
			console.log(req.body);
		    var color=req.body.color
			Box.destroy({where:{color:color}}).then(function(rows) {
    		console.log('deleted row '+ rows);
    		res.redirect('/boxes');
			});
		},
		updateBoxes: function(req,res){
			   console.log(req.body)
				var boxName=req.body.name//box label
				var boxColor=req.body.color//box color
			    Box.update(
			    	{color:boxColor},
			    	{where:{name:boxName}}
			    	).then(function(rows){
				    	console.log('updated row '+ rows);
	    				res.redirect('/boxes');	
			    	})
		}
		

	};//end return
};


