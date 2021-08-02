const fs = require("fs");
const parse = require("csv-parse");
const Logger = require("./logger");
const rebates = require("./rebates");

const logger = new Logger(rebates);

fs.createReadStream(`${__dirname}/input/orders_example.csv`)
  .pipe(parse({ delimiter: ",", columns: true }))
  .on("data", function (csvrow) {
    logger.outputOrgansReceived(csvrow);
  });
