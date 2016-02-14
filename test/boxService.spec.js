var expect = require("expect.js");
var Sequelize = require("sequelize");

var sql = new Sequelize('full_stack', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});


var model = require("./../model")(sql);
var boxService = require("./../boxService")(sql);




describe("boxService", function () {
    var mockResponse = function (callback) { return { send: callback }; };
    var newBox = { "name": "Johne", "color":"green" };
 
    beforeEach(function (done) {
        sql.sync({ force: true}).then(function () { done(); });
    });
 
    it("should find created users", function (done) {
        //arrange
        boxService.createBox(newBox).then(function () {
            //act
            boxService.getBoxes({}, mockResponse(function (data) {
                //assert
                console.log(data);
                expect(data[0].name).to.eql(newBox.name);
                done();
            }))
        })
    });
    it("should create user", function (done) {
        //arrange
        var req = { body: newBox };
        //act
        boxService.createBox(req, mockResponse(function (statusCode) {
            //assert
            expect(statusCode).to.eql(200);
            done();
        }))
    });
});


// To run mocha test we can run
// node node_modules/mocha/bin/mocha --watch