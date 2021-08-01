const rebates = require("./rebates");
let calculator = require("./calculator")(rebates);
let row = { organ: "liver", cash: 10, price: 5 };

calculator.outputOrgansReceived(row);
