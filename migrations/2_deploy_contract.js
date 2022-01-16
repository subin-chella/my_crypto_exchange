const CryptoExchange = artifacts.require("CryptoExchange");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
    //Deploy the tamil token
    await deployer.deploy(Token);
    const token = await Token.deployed();

    // Deploy the CryptoExchange SC
    await deployer.deploy(CryptoExchange);
    const cryptoExchange = await CryptoExchange.deployed();

    // Transfer all tamil token to CryptoExchange
    await token.transfer(cryptoExchange.address, '1000000000000000000000000')



};