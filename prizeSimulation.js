
// Settings Import:
const { depositAmounts, tvl, maxPrizes, prizeTiers, simulationDays, simulationRuns } = require('./config');

/* ========================================================================================================================================================================= */

// Function to simulate prize APR:
const simulatePrizeAPR = () => {
  depositAmounts.forEach(depositAmount => {

    // Initializations:
    let scaling = 1;
    let totalDailyPrizeCount = 0;
    let dailyWinProbability = 0;
    let totalWinnings = 0;
  
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
      totalDailyPrizeCount += tier.num;
    });

    // Finding Daily Winning Probability:
    dailyWinProbability = 1 / (tvl / totalDailyPrizeCount / scaling);

    // Running Simulations:
    for(let i = 0; i < simulationRuns; i++) {
      let winnings = simulate(depositAmount, scaling, totalDailyPrizeCount, dailyWinProbability);
      totalWinnings += winnings;
    }

    // Calculating APR:
    let avgWinnings = totalWinnings / simulationRuns;
    let apr = (avgWinnings / depositAmount) * ((365 / simulationDays) * 100);
    console.log(`Average APR for $${depositAmount}: ${apr.toFixed(2)}%`);

  });
}

// Function to run a simulation:
const simulate = (depositAmount, scaling, totalDailyPrizeCount, dailyWinProbability) => {
  let winnings = 0;
  for(let day = 0; day < simulationDays; day++) {
    let dayResult = simulateDay(depositAmount, scaling, totalDailyPrizeCount, dailyWinProbability);
    dayResult.forEach(prize => {
      winnings += prize;
    });
  }
  return winnings;
}

// Function to simulate a day's results:
const simulateDay = (depositAmount, scaling, totalDailyPrizeCount, dailyWinProbability) => {
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