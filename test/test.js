const Logger = require("../logger");
const rebates = require("../rebates");
const expect = require("expect.js");
const assert = require("assert");

const logger = new Logger(rebates);
console.log("logger: ", logger);

describe("Logger", function () {
  let output, write;
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
      let result = logger.calculateOrgansReceived();
      assert.deepStrictEqual(result, { heart: 0, liver: 2, lung: 1 });
    });
  });

  describe("#printOrgansReceived()", function () {
    it("prints the organs received in the correct order and right quantities", function () {
      logger.printOrgansReceived();
      expect(output).to.eql("heart 0, liver 2, lung 1\n");
    });
  });

  describe("#outputOrgansReceived()", function () {
    it("should log 'heart 0, liver 2, lung 1' when row is 'liver',10,5,2", function () {
      logger.outputOrgansReceived({
        organ: "liver",
        cash: 10,
        price: 5,
        bonusRatio: 2,
      });
      expect(output).to.eql("heart 0, liver 2, lung 1\n");
    });
  });
});
