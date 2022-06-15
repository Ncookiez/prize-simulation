
// General Settings:
exports.depositAmounts = [5, 10, 50, 100, 500, 750, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 25000, 50000, 75000, 100000, 300000, 500000, 750000, 1000000];
exports.tvl = 30000000;
exports.maxPrizes = 1;
exports.prizeTiers = [
  { prize: 1000, num: 1 },
  { prize: 100, num: 3 },
  { prize: 50, num: 12 },
  { prize: 10, num: 48 },
  { prize: 5, num: 192 },
  { prize: 5, num: 768 }
];

// Proposed Polygon Tiers:
// exports.prizeTiers = [
//   { prize: 1420, num: 1 },
//   { prize: 20, num: 12 },
//   { prize: 1, num: 3072 }
// ];

// Proposed Avalanche Tiers:
// exports.prizeTiers = [
//   { prize: 1420, num: 1 },
//   { prize: 17.25, num: 192 }
// ];

// Proposed Optimism Tiers:
// exports.prizeTiers = [
//   { prize: 1420, num: 1 },
//   { prize: 69, num: 48 }
// ];

// Proposed Ethereum Tiers:
// exports.prizeTiers = [
//   { prize: 1420, num: 1 },
//   { prize: 1104, num: 3 }
// ];

// Simulation Settings:
exports.simulationDays = 365;
exports.simulationRuns = 1000;