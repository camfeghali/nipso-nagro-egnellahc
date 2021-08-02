const rebates = require("./rebates");
const organs = Object.keys(rebates);
let env = process.env.NODE_ENV;

// let publicApi =
//   env === "test"
//     ? {
//         outputOrgansReceived,
//         calculateOrgansReceived,
//         printOrgansReceived,
//       }
//     : {
//         outputOrgansReceived,
//       };

// function outputOrgansReceived(row) {
//   let purchasedOrgan = row["organ"];
//   let { cash, price } = row;
//   let purchasedOrganCount = Math.floor(cash / price);
//   let organsReceived = calculateOrgansReceived(
//     purchasedOrgan,
//     purchasedOrganCount
//   );
//   printOrgansReceived(organsReceived);
// }

// function calculateOrgansReceived(purchasedOrgan, purchasedOrganCount) {
//   let multiplier = purchasedOrganCount / rebates[purchasedOrgan]["required"];
//   let organsReceived = {};

//   organs.forEach((organ) => {
//     let freeOrgan = rebates[purchasedOrgan]["freeOrgans"][organ];
//     organsReceived[organ] = freeOrgan ? freeOrgan * multiplier : 0;
//   });
//   organsReceived[purchasedOrgan] += purchasedOrganCount;

//   return organsReceived;
// }

// function printOrgansReceived(organsReceived) {
//   let STDOUT = "";

//   organs.forEach((organ) => {
//     STDOUT += `${organ} ${organsReceived[organ]}, `;
//   });

//   console.log(STDOUT.slice(0, STDOUT.length - 2));
// }

class Logger {
  #rebates;
  #purchasedOrgan;
  #purchasedOrganCount;
  #organsReceived;
  constructor(rebates) {
    this.rebates = rebates;
    this.organsReceived = {};
  }

  outputOrgansReceived(row) {
    this.purchasedOrgan = row["organ"];
    let { cash, price } = row;
    this.purchasedOrganCount = Math.floor(cash / price);
    this.calculateOrgansReceived();
    this.printOrgansReceived();
  }

  printOrgansReceived() {
    let STDOUT = "";

    organs.forEach((organ) => {
      STDOUT += `${organ} ${this.organsReceived[organ]}, `;
    });

    console.log(STDOUT.slice(0, STDOUT.length - 2));
  }

  calculateOrgansReceived() {
    let multiplier =
      this.purchasedOrganCount / this.rebates[this.purchasedOrgan]["required"];

    organs.forEach((organ) => {
      let freeOrgan = this.rebates[this.purchasedOrgan]["freeOrgans"][organ];
      this.organsReceived[organ] = freeOrgan ? freeOrgan * multiplier : 0;
    });
    this.organsReceived[this.purchasedOrgan] += this.purchasedOrganCount;
  }
}

module.exports = Logger;
