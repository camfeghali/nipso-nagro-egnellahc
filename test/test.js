const rebates = require("../rebates");
let logger = require("../logger")(rebates);
var expect = require("expect.js");

describe("Logger", function () {
  describe("#calculateBonusOrgans()", function () {
    it("should return {heart: 0, lung: 1} when passing ('liver', 2)", function () {
      let result = logger.calculateBonusOrgans("liver", 2);
      console.log("result: ", result);
      expect(result).to.eql({ heart: 0, lung: 1 });
    });
  });
});
