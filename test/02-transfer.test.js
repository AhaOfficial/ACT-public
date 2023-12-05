const Artifact = artifacts.require("ACT");
const Assert = require("truffle-assertions");

contract("ACT-02-transfer.test 🚀", (accounts) => {
  let contractInstance;
  const ownerAddress = accounts[0];
  const address1 = accounts[1];

  before(() => {
    web3.eth.defaultAccount = ownerAddress;
  });

  beforeEach(async () => {
    contractInstance = await Artifact.new();
  });

  it("transfer should throw if to address is not valid", async () => {
    await Assert.reverts(
      contractInstance.transfer(
        "0x0000000000000000000000000000000000000000",
        1000,
        { from: ownerAddress }
      ),
      "ERC20: transfer to the zero address"
    );
  });

  it("transfer should throw if balance is insufficient", async () => {
    await Assert.reverts(
      contractInstance.transfer(ownerAddress, 1000, { from: address1 }),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("transfer success", async () => {
    const result = await contractInstance.transfer(address1, 1000, {
      from: ownerAddress,
    });

    Assert.eventEmitted(result, "Transfer");
  });
});
