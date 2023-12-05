const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-03-balance-of.test 🚀", (accounts) => {
  let contractInstance;
  const ownerAddress = accounts[0];

  before(() => {
    web3.eth.defaultAccount = ownerAddress;
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("balanceOf success", async () => {
    const result = await contractInstance.balanceOf(ownerAddress, {
      from: ownerAddress,
    });

    assert.equal(
      result.toString(),
      "10500000000000000000000000000",
      "balance is wrong"
    );
  });
});
