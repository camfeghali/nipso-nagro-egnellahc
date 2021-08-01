const rebates = require("./rebates");
let calculator = require("./logger")(rebates);
let row = { organ: "liver", cash: 10, price: 5 };

calculator.outputOrgansReceived(row);
