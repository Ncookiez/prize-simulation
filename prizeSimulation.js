
// Initializations:
const maxPrizes = 2;
let scaling = 1;
let totalDailyPrizeAmount = 0;
let totalDailyPrizeCount = 0;
let dailyWinProbability = 0;
let totalWinnings = 0;

// Settings:
const depositAmount = 25000;
const tvl = 29000000;
const simulationDays = 365;
const simulationRuns = 300;
const prizeTiers = [
  { prize: 1000, num: 1 },
  { prize: 100, num: 3 },
  { prize: 50, num: 12 },
  { prize: 10, num: 48 },
  { prize: 5, num: 192 },
  { prize: 5, num: 768 }
];

/* ========================================================================================================================================================================= */

// Function to simulate prize APR:
const simulatePrizeAPR = () => {
  
  // Finding Appropriate Scaling For Efficiency:
  if(depositAmount >= 50000) {
    scaling = depositAmount / 500;
  } else if(depositAmount >= 5000) {
    scaling = depositAmount / 100;
  } else if(depositAmount >= 50) {
    scaling = depositAmount / 50;
  }

  // Finding Total Prize Data:
  prizeTiers.forEach(tier => {
    totalDailyPrizeAmount += tier.prize * tier.num;
    totalDailyPrizeCount += tier.num;
  });

  // Finding Daily Winning Probability:
  dailyWinProbability = 1 / (tvl / totalDailyPrizeCount / scaling);

  // Running Simulations:
  for(let i = 0; i < simulationRuns; i++) {
    let winnings = simulate();
    totalWinnings += winnings;
  }

  // Calculating APR:
  let avgWinnings = totalWinnings / simulationRuns;
  let apr = (avgWinnings / depositAmount) * ((365 / simulationDays) * 100);
  console.log(`Average APR: ${apr.toFixed(2)}%`);

}

// Function to run a simulation:
const simulate = () => {
  let winnings = 0;
  for(let day = 0; day < simulationDays; day++) {
    let dayResult = simulateDay();
    dayResult.forEach(prize => {
      winnings += prize;
    });
  }
  return winnings;
}

// Function to simulate a day's results:
const simulateDay = () => {
  let prizes = [];
  for(let draw = 0; draw < Math.trunc(depositAmount / scaling); draw++) {
    prizeTiers.forEach(tier => {
      if(Math.random() < ((tier.num / totalDailyPrizeCount) * dailyWinProbability)) {
        prizes.push(tier.prize);
      }
    });
  }
  return prizes.sort((a, b) => b - a).slice(0, maxPrizes);
}

/* ========================================================================================================================================================================= */

simulatePrizeAPR();