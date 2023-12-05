const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-04-transfer-from.test 🚀", (accounts) => {
  let contractInstance;

  before(() => {
    web3.eth.defaultAccount = accounts[0];
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("transferFrom should throw if from address is not valid", async () => {
    await Assert.reverts(
      contractInstance.transferFrom(
        "0x0000000000000000000000000000000000000000",
        accounts[1],
        1000,
        { from: accounts[0] }
      ),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom should throw if to address is not valid", async () => {
    await Assert.reverts(
      contractInstance.transferFrom(
        accounts[1],
        "0x0000000000000000000000000000000000000000",
        1000,
        { from: accounts[0] }
      ),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom should throw if balance is insufficient", async () => {
    await Assert.reverts(
      contractInstance.transferFrom(accounts[1], accounts[2], 1000, {
        from: accounts[1],
      }),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom should throw if sender is not approved", async () => {
    await Assert.reverts(
      contractInstance.transferFrom(accounts[0], accounts[2], 1000, {
        from: accounts[1],
      }),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom success", async () => {
    await contractInstance.transfer(accounts[1], 1000, { from: accounts[0] });
    await contractInstance.approve(accounts[1], 1000, { from: accounts[0] });
    const result = await contractInstance.transferFrom(
      accounts[0],
      accounts[2],
      1000,
      { from: accounts[1] }
    );

    Assert.eventEmitted(result, "Transfer");
  });
});
