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

const organs = Object.keys(rebates);

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

let row = {
  organ: "liver",
  cash: 10,
  price: 5,
  bonusRatio: 2,
};

outputOrgansReceived(row);
