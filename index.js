const rebates = require("./rebates");
let logger = require("./logger")(rebates);

var fs = require("fs");
var parse = require("csv-parse");

fs.createReadStream(`${__dirname}/input/orders_example.csv`)
  .pipe(parse({ delimiter: ",", columns: true }))
  .on("data", function (csvrow) {
    logger.outputOrgansReceived(csvrow);
  });
