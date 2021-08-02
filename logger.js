let env = process.env.NODE_ENV;

function Logger(rebates) {
  let purchasedOrgan, purchasedOrganCount;
  let organsReceived = {};
  const organs = Object.keys(rebates);
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
    purchasedOrgan = row["organ"];
    let { cash, price } = row;
    purchasedOrganCount = Math.floor(cash / price);
    calculateOrgansReceived();
    printOrgansReceived();
  }

  function calculateOrgansReceived() {
    let multiplier = purchasedOrganCount / rebates[purchasedOrgan]["required"];

    organs.forEach((organ) => {
      let freeOrgan = rebates[purchasedOrgan]["freeOrgans"][organ];
      organsReceived[organ] = freeOrgan ? freeOrgan * multiplier : 0;
    });

    organsReceived[purchasedOrgan] += purchasedOrganCount;
  }

  function printOrgansReceived() {
    let STDOUT = "";
    organs.forEach((organ) => {
      STDOUT += `${organ} ${organsReceived[organ]}, `;
    });

    console.log(STDOUT.slice(0, STDOUT.length - 2));
  }

  return publicApi;
}

module.exports = Logger;
