const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");
const CryptoExchange = artifacts.require("CryptoExchange");

require('chai')
    .use(require('chai-as-promised'))
    .should()


 function tokens(n){
     return web3.utils.toWei(n, 'ether');
 }  
 
 let token, cryptoExchange;

contract('CryptoExchange', ([deployer, investor]) => {


    describe('Crypto Exchange Deployment', async() => {
        it('Contract has a name', async() => {
             token = await Token.new()

            cryptoExchange = await CryptoExchange.new(token.address)

            const name = await cryptoExchange.name()

            assert.equal(name, 'Crypto Exchange instance')

        })

    })

    describe('Token Exchange Deployment', async() => {
        it('Contract has a name', async() => {

            //token = await Token.new()

            const name = await token.name()

            assert.equal(name, 'TamilCrypto Token')

        })

        it('Contract has tokens', async() => {

           // let token = await Token.new()
           // let cryptoExchange = await CryptoExchange.new()

            await token.transfer(cryptoExchange.address, tokens('1000000'))

            let balance = await token.balanceOf(cryptoExchange.address);

            assert.equal(balance.toString(), tokens('1000000'))

        })

    })

      describe('buyTokens()', async() => {

        let result;
        before (async () => {
            result = await cryptoExchange.buyTokens({from : investor, value : web3.utils.toWei('1','ether')});
        })
        it('Allows users to buy tamil token with ether', async() => {

            //Investor balance after depositing ether
           let investorBalance = await token.balanceOf(investor);
           assert.equal(investorBalance.toString(), tokens('100'))

            //TamilToken Balance
            let cryptoExchangeBalance = await token.balanceOf(cryptoExchange.address);
            assert.equal(cryptoExchangeBalance.toString(), tokens('999900'))


            let cryptoExchangeBalanceEth = await web3.eth.getBalance(cryptoExchange.address);
            assert.equal(cryptoExchangeBalanceEth.toString(), web3.utils.toWei('1','ether'));
                     
            const args1 = result.logs[0].args;

            assert.equal(args1.account, investor)

            assert.equal(args1.amount.toString(), tokens('100'))
            assert.equal(args1.rate, '100')  
            assert.equal(args1.token, token.address)




        })

    })

    describe('sellTokens()', async() => {

        let result;
        before (async () => {
            await token.approve(cryptoExchange.address, tokens('100'), {from : investor})
            result = await cryptoExchange.sellTokens( tokens('100'), {from : investor});
        })
        it('Allows users to sell tamil token and get ether', async() => {

            
            //Investor balance after depositing ether
           let investorBalance = await token.balanceOf(investor);
           assert.equal(investorBalance.toString(), tokens('0'))

            //TamilToken Balance
            let cryptoExchangeBalance = await token.balanceOf(cryptoExchange.address);
            assert.equal(cryptoExchangeBalance.toString(), tokens('1000000'))


            let cryptoExchangeBalanceEth = await web3.eth.getBalance(cryptoExchange.address);
            assert.equal(cryptoExchangeBalanceEth.toString(), web3.utils.toWei('0','ether'));
                     
            

            const args1 = result.logs[0].args;
            assert.equal(args1.account, investor)
            assert.equal(args1.amount.toString(), tokens('100'))
            assert.equal(args1.rate, '100')  
            assert.equal(args1.token, token.address)


            // Negative scenario

            result = await cryptoExchange.sellTokens( tokens('100'), {from : investor}).should.be.rejected;




        })

    })

})