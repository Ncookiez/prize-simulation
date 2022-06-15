
// Settings Import:
import { depositAmounts, tvl, maxPrizes, prizeTiers } from './config';

/* ========================================================================================================================================================================= */

// Function to calculate estimated prize APR:
const calculatePrizeAPR = () => {
  depositAmounts.forEach(depositAmount => {

    // Initializations:
    let dailyPrizeCount = 0;
    let winnings = 0;
    let cumulativeMaxPrizes = 0;

    // Finding Total Prize Data:
    prizeTiers.forEach(tier => {
      dailyPrizeCount += tier.num;
    });

    // Finding Daily Winning Probability:
    let dailyWinProbability = (1 / (tvl / dailyPrizeCount)) * depositAmount;

    // Calculating Daily Winnings:
    prizeTiers.forEach(tier => {
      let expectedWins = Math.min(((tier.num / dailyPrizeCount) * dailyWinProbability), maxPrizes - cumulativeMaxPrizes);
      winnings += expectedWins * tier.prize;
      if(cumulativeMaxPrizes < maxPrizes) {
        cumulativeMaxPrizes = Math.min(cumulativeMaxPrizes + expectedWins, maxPrizes);
      }
    });

    // Calculating APR:
    let apr = (winnings * 365 / depositAmount) * 100;
    console.log(`Estimated APR for $${depositAmount}: ${apr.toFixed(2)}%`);

  });
}

/* ========================================================================================================================================================================= */

calculatePrizeAPR();