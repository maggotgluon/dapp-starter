const { expect } = require("chai");
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

describe("SummonerCystalTokenCrowdsale", () => {
  it("Should have 8% of SummonerCystalToken tokens", async () => {
    const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
    const summonercystalToken = await SummonerCystalToken.deploy();
    await summonercystalToken.deployed();

    expect(await summonercystalToken.name()).to.equal("SummonerCystalToken");
    expect(await summonercystalToken.symbol()).to.equal("ITM");
    expect(await summonercystalToken.decimals()).to.equal(18);
    const totalSupply = await summonercystalToken.totalSupply();
    expect(totalSupply).to.equal(ethers.BigNumber.from("350000000000000000000000000"));
    const owner = await summonercystalToken.owner();

    const latestBlockTime = await latestTime();
    const openingTime = latestBlockTime + duration.minutes(1);
    const closeTime = openingTime + duration.weeks(1); // 1 week

    const SummonerCystalTokenCrowdsale = await ethers.getContractFactory("SummonerCystalTokenCrowdsale");
    const rate = 1400; // 500 wei per token
    const summonercystalCrowdsale = await SummonerCystalTokenCrowdsale.deploy(
      rate,
      owner,
      summonercystalToken.address,
      owner,
      openingTime,
      closeTime
    );

    await summonercystalCrowdsale.deployed();

    await summonercystalToken.approve(
      summonercystalCrowdsale.address,
      totalSupply.mul(ethers.BigNumber.from(8)).div(ethers.BigNumber.from(100))
    );

    expect(await summonercystalCrowdsale.rate()).to.equal(rate);
    expect(await summonercystalCrowdsale.remainingTokens()).to.equal(ethers.BigNumber.from("28000000000000000000000000"));
  });
  // TODO: add unit test for time validation
  // TODO: add unit test for token allocation
});
