const expect = require("expect.js");
const assert = require("assert");
const Logger = require("../logger");
const rebates = require("../rebates");

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
    it("sets logger.organsReceived to { heart: 0, liver: 2, lung: 1 } when logger.purchasedOrgan = 'liver' and logger.purchasedOrganCount = 2", function () {
      const logger = new Logger(rebates);
      logger.purchasedOrgan = "liver";
      logger.purchasedOrganCount = 2;
      logger.calculateOrgansReceived();
      assert.deepStrictEqual(logger.organsReceived, {
        heart: 0,
        liver: 2,
        lung: 1,
      });
    });
  });

  describe("#printOrgansReceived()", function () {
    it("prints the organs received in the correct order and right quantities", function () {
      const logger = new Logger(rebates);
      logger.organsReceived = { heart: 0, liver: 2, lung: 1 };
      logger.printOrgansReceived();
      expect(output).to.eql("heart 0, liver 2, lung 1\n");
    });
  });

  describe("#outputOrgansReceived()", function () {
    it("should log 'heart 0, liver 2, lung 1' when row is 'liver',10,5,2", function () {
      const logger = new Logger(rebates);
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
