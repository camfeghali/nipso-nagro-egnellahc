const fs = require("fs");
const parse = require("csv-parse");
const Logger = require("./logger");

fs.createReadStream(`${__dirname}/input/orders_example.csv`)
  .pipe(parse({ delimiter: ",", columns: true }))
  .on("data", function (csvrow) {
    Logger.outputOrgansReceived(csvrow);
  });
