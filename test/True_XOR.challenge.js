const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("True XOR", function () {

  let deployer, vipUser, attacker;
  
  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const TrueXORFactory = await ethers.getContractFactory("TrueXOR");
    this.TrueXOR = await TrueXORFactory.deploy();

  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */

    // Deploy attack contract
    const AttackTrueXORFactory = await ethers.getContractFactory("AttackTrueXOR");
    this.AttackTrueXOR = await AttackTrueXORFactory.deploy();

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // able to execute callMe()
    expect(
      await this.TrueXOR.callMe(this.AttackTrueXOR.address)
    ).eq(true);        
  });

});
