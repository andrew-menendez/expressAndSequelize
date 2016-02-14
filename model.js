
var Sequelize= require('sequelize');

//because we want to pass in the 'sql' instanciation
module.exports= function(sql){


// model definition

	var Box = sql.define("Box", {
    name: Sequelize.STRING,
    color: Sequelize.STRING
	});

	return {Box:Box};

};