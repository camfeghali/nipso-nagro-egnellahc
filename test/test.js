const Logger = require("../logger");
var expect = require("expect.js");
var assert = require("assert");

describe("Logger", function () {
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

  describe("#calculateOrgansReceived()", function () {
    it("should return { heart: 0, liver: 2, lung: 1 } when passing ('liver', 2)", function () {
      let result = Logger.calculateOrgansReceived("liver", 2);
      assert.deepStrictEqual(result, { heart: 0, liver: 2, lung: 1 });
    });
  });

  describe("#printOrgansReceived()", function () {
    it("prints the organs received in the correct order and right quantities", function () {
      Logger.printOrgansReceived({ liver: 2, heart: 0, lung: 1 });
      expect(output).to.eql("heart 0, liver 2, lung 1\n");
    });
  });

  describe("#outputOrgansReceived()", function () {
    it("should log 'heart 0, liver 2, lung 1' when row is 'liver',10,5,2", function () {
      Logger.outputOrgansReceived({
        organ: "liver",
        cash: 10,
        price: 5,
        bonusRatio: 2,
      });
      expect(output).to.eql("heart 0, liver 2, lung 1\n");
    });
  });
});
