const rebates = require("./rebates");

class Logger {
  #rebates;
  #purchasedOrgan;
  #purchasedOrganCount;
  #organsReceived;
  #organs;
  constructor(rebates) {
    this.rebates = rebates;
    this.organsReceived = {};
    this.organs = Object.keys(rebates);
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
    this.organs.forEach((organ) => {
      STDOUT += `${organ} ${this.organsReceived[organ]}, `;
    });
    console.log(STDOUT.slice(0, STDOUT.length - 2));
  }

  calculateOrgansReceived() {
    let multiplier =
      this.purchasedOrganCount / this.rebates[this.purchasedOrgan]["required"];

    this.organs.forEach((organ) => {
      let freeOrgan = this.rebates[this.purchasedOrgan]["freeOrgans"][organ];
      this.organsReceived[organ] = freeOrgan ? freeOrgan * multiplier : 0;
    });
    this.organsReceived[this.purchasedOrgan] += this.purchasedOrganCount;
  }
}

module.exports = Logger;
