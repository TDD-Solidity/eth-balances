const Balances = artifacts.require("Balances");

module.exports = function (deployer) {
  deployer.deploy(Balances);
};
