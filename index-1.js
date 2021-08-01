var fs = require("fs");
var parse = require("csv-parse");

const rebates = {
  heart: {
    required: 3,
    freeOrgans: {
      heart: 1,
    },
  },
  liver: {
    required: 2,
    freeOrgans: {
      lung: 1,
    },
  },
  lung: {
    required: 4,
    freeOrgans: {
      liver: 1,
      hear: 1,
    },
  },
};

var parser = parse({ columns: true }, function (err, orders) {
  orders.forEach(function (order) {
    ["heart", "liver", "lung"].reduce((acc, organ) => {
      return { ...acc };
    }, {});
  });
});

fs.createReadStream(__dirname + "/input/orders_example.csv").pipe(parser);

// const parse = require("csv-parse");
// const fs = require("fs");
// const { finished } = require("stream/promises");

// const processFile = async () => {
//   records = [];
//   const parser = fs
//     .createReadStream(`${__dirname}/input/orders_example.csv`)
//     .pipe(
//       parse({
//         // CSV options if any
//       })
//     );
//   parser.on("readable", function () {
//     let record;
//     while ((record = parser.read())) {
//       // Work with each record
//       console.log("record: ", record);
//       records.push(record);
//     }
//   });
//   await finished(parser);
//   return records;
// };

// (async () => {
//   const records = await processFile();
//   console.info(records);
// })();
