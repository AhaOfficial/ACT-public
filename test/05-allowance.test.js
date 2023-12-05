const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-05-allowance.test 🚀", (accounts) => {
  let contractInstance;

  before(() => {
    web3.eth.defaultAccount = accounts[0];
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("not allowance", async () => {
    const result = await contractInstance.allowance(accounts[0], accounts[1], {
      from: accounts[0],
    });

    assert.equal(0, result.toNumber(), "wrong result");
  });

  it("allowance", async () => {
    const expectedAmount = 1000;

    await contractInstance.approve(accounts[1], expectedAmount, {
      from: accounts[0],
    });
    const result = await contractInstance.allowance(accounts[0], accounts[1], {
      from: accounts[0],
    });

    assert.equal(expectedAmount, result.toNumber(), "wrong result");
  });
});
