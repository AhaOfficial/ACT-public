const Migrations = artifacts.require("Migrations");
const ACT = artifacts.require("ACT");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.link(Migrations, ACT);
  deployer.deploy(ACT);
};
