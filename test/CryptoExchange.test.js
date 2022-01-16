const Token = artifacts.require("Token");
const CryptoExchange = artifacts.require("CryptoExchange");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('CryptoExchange', (accounts) => {

    describe('Crypto Exchange Deployment', async() => {
        it('Contract has a name', async() => {

            let cryptoExchange = await CryptoExchange.new()

            const name = await cryptoExchange.name()

            assert.equal(name, 'Crypto Exchange instance')

        })

    })


})