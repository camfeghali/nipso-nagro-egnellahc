module.exports = {
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
