const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-07-decrease-allowance.test 🚀", (accounts) => {
  let contractInstance;

  before(() => {
    web3.eth.defaultAccount = accounts[0];
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("decreaseAllowance success", async () => {
    const initialAmount = 1000;
    const expectedAmount = 500;

    await contractInstance.approve(accounts[1], initialAmount, {
      from: accounts[0],
    });

    const resultBeforeDecrease = await contractInstance.allowance(
      accounts[0],
      accounts[1],
      { from: accounts[0] }
    );

    const resultDecrease = await contractInstance.decreaseAllowance(
      accounts[1],
      500,
      { from: accounts[0] }
    );

    const resultAfterDecrease = await contractInstance.allowance(
      accounts[0],
      accounts[1],
      { from: accounts[0] }
    );

    assert.equal(
      initialAmount,
      resultBeforeDecrease.toNumber(),
      "wrong result berore increase"
    );

    assert.equal(
      expectedAmount,
      resultAfterDecrease.toNumber(),
      "wrong result after increase"
    );

    Assert.eventEmitted(resultDecrease, "Approval");
  });
});
