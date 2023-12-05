const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-06-increase-allowance.test 🚀", (accounts) => {
  let contractInstance;

  before(() => {
    web3.eth.defaultAccount = accounts[0];
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("increaseAllowance success", async () => {
    const initialAmount = 1000;
    const expectedAmount = 2000;

    await contractInstance.approve(accounts[1], initialAmount, {
      from: accounts[0],
    });

    const resultBeforeIncrease = await contractInstance.allowance(
      accounts[0],
      accounts[1],
      { from: accounts[0] }
    );

    const resultIncrease = await contractInstance.increaseAllowance(
      accounts[1],
      initialAmount,
      { from: accounts[0] }
    );

    const resultAfterIncrease = await contractInstance.allowance(
      accounts[0],
      accounts[1],
      { from: accounts[0] }
    );

    assert.equal(
      initialAmount,
      resultBeforeIncrease.toNumber(),
      "wrong result berore increase"
    );

    assert.equal(
      expectedAmount,
      resultAfterIncrease.toNumber(),
      "wrong result after increase"
    );

    Assert.eventEmitted(resultIncrease, "Approval");
  });
});
