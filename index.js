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

"liver", 10, 5, 2;

let row = {
  organ: "liver",
  cash: 10,
  price: 5,
  bonusRatio: 2,
};

let organsReceived = {
  heart: 3,
  liver: 1,
  lung: 2,
};

function calculateOrgansReceived(row) {
  let { organ, cash, price } = row;
  let purchasedOrganCount = Math.floor(cash / price);
  let bonusOrgans = calculateBonusOrgans(organ, purchasedOrganCount);
  return {
    ...{ [organ]: purchasedOrganCount },
    ...bonusOrgans,
  };
}

function calculateBonusOrgans(purchasedOrgan, count) {
  let multiplier = count / rebates[purchasedOrgan]["required"];
  let bonusOrgans = {};

  ["heart", "liver", "lung"].forEach((organ) => {
    if (purchasedOrgan != organ) {
      bonusOrgans[organ] = rebates[purchasedOrgan]["freeOrgans"][organ]
        ? rebates[purchasedOrgan]["freeOrgans"][organ] * multiplier
        : 0;
    }
  });
  return bonusOrgans;
}

function printOrgansReceived(organsReceived) {
  console.log(
    `heart ${organsReceived["heart"]}, liver ${organsReceived["liver"]}, lung ${organsReceived["lung"]}`
  );
}

console.log("organsReceived", calculateOrgansReceived(row));
