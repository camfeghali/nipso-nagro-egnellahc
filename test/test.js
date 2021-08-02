const Logger = require("../logger");
const rebates = require("../rebates");
const expect = require("expect.js");
const assert = require("assert");

const logger = new Logger(rebates);

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
