const rebates = require("./rebates");
const organs = Object.keys(rebates);
let env = process.env.NODE_ENV;

let publicApi =
  env === "test"
    ? {
        outputOrgansReceived,
        calculateOrgansReceived,
        printOrgansReceived,
      }
    : {
        outputOrgansReceived,
      };

function outputOrgansReceived(row) {
  let purchasedOrgan = row["organ"];
  let { cash, price } = row;
  let purchasedOrganCount = Math.floor(cash / price);
  let organsReceived = calculateOrgansReceived(
    purchasedOrgan,
    purchasedOrganCount
  );
  printOrgansReceived(organsReceived);
}

function calculateOrgansReceived(purchasedOrgan, purchasedOrganCount) {
  let multiplier = purchasedOrganCount / rebates[purchasedOrgan]["required"];
  let organsReceived = {};

  organs.forEach((organ) => {
    let freeOrgan = rebates[purchasedOrgan]["freeOrgans"][organ];
    organsReceived[organ] = freeOrgan ? freeOrgan * multiplier : 0;
  });
  organsReceived[purchasedOrgan] += purchasedOrganCount;

  return organsReceived;
}

function printOrgansReceived(organsReceived) {
  let STDOUT = "";

  organs.forEach((organ) => {
    STDOUT += `${organ} ${organsReceived[organ]}, `;
  });

  console.log(STDOUT.slice(0, STDOUT.length - 2));
}

module.exports = publicApi;
