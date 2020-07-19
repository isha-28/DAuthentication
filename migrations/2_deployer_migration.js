var contract = artifacts.require("BbAS.sol")

module.exports = function(deployer) {
    deployer.deploy(contract);
}