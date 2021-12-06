
const DekarbonToken = artifacts.require("DekarbonToken");
const DekarbonMarketplace = artifacts.require("DekarbonMarketplace");

module.exports = async function(deployer) {
  await deployer.deploy(DekarbonToken);

  const token = await DekarbonToken.deployed()

  await deployer.deploy(DekarbonMarketplace, token.address)

  const market = await DekarbonMarketplace.deployed()

  await token.setMarketplace(market.address)
};