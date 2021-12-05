// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
const { ethers } = require("hardhat");

async function latestTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

const duration = {
  seconds(val) {
    return val;
  },
  minutes(val) {
    return val * this.seconds(60);
  },
  hours(val) {
    return val * this.minutes(60);
  },
  days(val) {
    return val * this.hours(24);
  },
  weeks(val) {
    return val * this.days(7);
  },
  years(val) {
    return val * this.days(365);
  },
};

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
  const summonercystalToken = await SummonerCystalToken.deploy();

  await summonercystalToken.deployed();
  console.log("SummonerCystalToken deployed to:", summonercystalToken.address);
  console.log("Name", await summonercystalToken.name());
  console.log("Symbol", await summonercystalToken.symbol());
  console.log("Decimals", await summonercystalToken.decimals());
  const totalSupply = await summonercystalToken.totalSupply();
  console.log("Total Supply", totalSupply);
  const owner = await summonercystalToken.owner();
  console.log("Owner", owner);

  // deploy crowdsale contract
  const SummonerCystalTokenCrowdsale = await ethers.getContractFactory("SummonerCystalTokenCrowdsale");
  const rate = 1400; // 500 wei per token
  const latestBlockTime = await latestTime();
  const openingTime = latestBlockTime + duration.minutes(1);
  const closeTime = openingTime + duration.weeks(1); // 1 week
  console.log("openingTime", openingTime);
  console.log("closeTime", closeTime);
  const summonercystalCrowdsale = await SummonerCystalTokenCrowdsale.deploy(
    rate,
    owner,
    summonercystalToken.address,
    owner,
    openingTime,
    closeTime
  );

  await summonercystalCrowdsale.deployed();
  console.log("SummonerCystalTokenCrowdsale deployed to:", summonercystalCrowdsale.address);

  // approve crowdsale contract to spend 8% tokens
  await summonercystalToken.approve(
    summonercystalCrowdsale.address,
    totalSupply.mul(ethers.BigNumber.from(8)).div(ethers.BigNumber.from(100))
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
