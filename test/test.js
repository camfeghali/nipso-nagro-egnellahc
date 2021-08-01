const rebates = require("../rebates");
let logger = require("../logger")(rebates);
var expect = require("expect.js");
var assert = require("assert");

describe("Logger", function () {
  describe("#calculateBonusOrgans()", function () {
    it("should return {heart: 0, lung: 1} when passing ('liver', 2)", function () {
      let result = logger.calculateBonusOrgans("liver", 2);
      console.log("result: ", result);
      expect(result).to.eql({ heart: 0, lung: 1 });
    });
  });

  describe("#printOrgansReceived()", function () {
    var output, write;

    write = process.stdout.write;

    beforeEach(function () {
      output = "";
      process.stdout.write = function (str) {
        output += str;
      };
    });

    afterEach(function () {
      process.stdout.write = write;
    });
    it("prints the organs received in the correct order and right quantities", function () {
      logger.printOrgansReceived({ liver: 2, heart: 0, lung: 1 });
      assert.equal(output, "heart 0, liver 2, lung 1\n");
    });
  });
});
