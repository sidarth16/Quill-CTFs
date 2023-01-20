const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("D31eg4t3", function () {

  let deployer, attacker;

  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const D31eg4t3Factory = await ethers.getContractFactory("D31eg4t3");
    this.D31eg4t3 = await D31eg4t3Factory.deploy();
  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */

    const AttackD31eg4t3Factory = await ethers.getContractFactory("AttackD31eg4t3");
    AttackD31eg4t3 = await AttackD31eg4t3Factory.deploy();
    await AttackD31eg4t3.connect(attacker).attackHackMe(this.D31eg4t3.address)

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    //  Attacker is the owner of the D31eg4t3 contract.
    expect(await this.D31eg4t3.owner()).to.be.equal(attacker.address);        

    // canYouHackMe mapping to be true for attacker address.
    expect(await this.D31eg4t3.canYouHackMe(attacker.address)).to.be.equal(true);        
  });

});


