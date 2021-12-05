const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SummonerCystalToken", () => {
  it("Should return the token name", async () => {
    const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
    const summonercystalToken = await SummonerCystalToken.deploy();
    await summonercystalToken.deployed();

    expect(await summonercystalToken.name()).to.equal("SummonerCystalToken");
  });

  it("Should return the token symbol", async () => {
    const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
    const summonercystalToken = await SummonerCystalToken.deploy();
    await summonercystalToken.deployed();

    expect(await summonercystalToken.symbol()).to.equal("ITM");
  });

  it("Should return decimals", async () => {
    const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
    const summonercystalToken = await SummonerCystalToken.deploy();
    await summonercystalToken.deployed();

    expect(await summonercystalToken.decimals()).to.equal(18);
  });

  it("Should have total supply", async () => {
    const SummonerCystalToken = await ethers.getContractFactory("SummonerCystalToken");
    const summonercystalToken = await SummonerCystalToken.deploy();
    await summonercystalToken.deployed();

    expect(await summonercystalToken.totalSupply()).to.equal(ethers.BigNumber.from("350000000000000000000000000"));
  });
});
