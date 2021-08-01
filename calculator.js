let env = process.env.NODE_ENV;

function logger(rebates) {
  const organs = Object.keys(rebates);

  let interface =
    env === "test"
      ? {
          outputOrgansReceived,
          calculateBonusOrgans,
          printOrgansReceived,
        }
      : {
          outputOrgansReceived,
        };

  function outputOrgansReceived(row) {
    let purchasedOrgan = row["organ"];
    let { cash, price } = row;
    let purchasedOrganCount = Math.floor(cash / price);
    let bonusOrgans = calculateBonusOrgans(purchasedOrgan, purchasedOrganCount);
    let organsReceived = {
      ...{ [purchasedOrgan]: purchasedOrganCount },
      ...bonusOrgans,
    };
    printOrgansReceived(organsReceived);
  }

  function calculateBonusOrgans(purchasedOrgan, count) {
    let multiplier = count / rebates[purchasedOrgan]["required"];
    let bonusOrgans = {};

    organs.forEach((organ) => {
      if (purchasedOrgan != organ) {
        let freeOrgan = rebates[purchasedOrgan]["freeOrgans"][organ];
        bonusOrgans[organ] = freeOrgan ? freeOrgan * multiplier : 0;
      }
    });
    return bonusOrgans;
  }

  function printOrgansReceived(organsReceived) {
    let STDOUT = "";

    organs.forEach((organ) => {
      STDOUT += `${organ} ${organsReceived[organ]}, `;
    });

    console.log(STDOUT.slice(0, STDOUT.length - 2));
  }

  return interface;
}

module.exports = logger;
