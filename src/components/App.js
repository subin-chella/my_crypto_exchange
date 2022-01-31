import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import CryptoExchange from '../abis/CryptoExchange.json'
import Token from '../abis/Token.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    console.log(window.web3)
    await this.loadBlockChainData()

  }

  async loadBlockChainData(){

    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    this.setState({ account: accounts[0]})

    console.log(this.state.account)

    const ethBalance = await web3.eth.getBalance(this.state.account);

    this.setState({ ethBalance: ethBalance})

   // console.log(ethBalance)
   const abi = Token.abi
   const address = Token.networks.address
   const token = new web3.eth.Contract(abi, address)
    console.log('token ' +token)


     // Load Token
     const networkId =  await web3.eth.net.getId()
     const tokenData = Token.networks[networkId]
     if(tokenData) {
       const token = new web3.eth.Contract(Token.abi, tokenData.address)
       this.setState({ token })
       let tokenBalance = await token.methods.balanceOf(this.state.account).call()
       this.setState({ tokenBalance: tokenBalance.toString() })
     } else {
       window.alert('Token contract not deployed to detected network.')
     }
 
     // Load cryptoExchange
     const cryptoExchangeData = CryptoExchange.networks[networkId]
     if(cryptoExchangeData) {
       const cryptoExchange = new web3.eth.Contract(CryptoExchange.abi, cryptoExchangeData.address)
       
       this.setState({ cryptoExchange })
     } else {
       window.alert('cryptoExchange contract not deployed to detected network.')
     }

     this.setState( {loading: false} )

  }


  async loadWeb3(){
    if (window.ethereum) {

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
  
    else if (window.web3) {
     window.web3 = new Web3(window.web3.currentProvider)    
    }
    
    else {    
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    
    }

   
  }
  buyTokens = (etherAmount) => {
    this.setState({loading:true})
    console.log('cryptoExchange'+this.state.account)
    this.state.cryptoExchange.methods.buyTokens().send({value: etherAmount, from :this.state.account}).on('transactionHash',(hash) =>{
      this.setState( {loading : false})
    });
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.cryptoExchange.address, tokenAmount).send({ from: this.state.account }).on('confirmation', (receipt                                                                                                       ) => {
         
      
      this.state.cryptoExchange.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
 
  constructor (props){

    super(props)
    this.state= {
      account : '',
      token :{},
      cryptoExchange: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true

    }
   // this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)

  }

  render() {
    console.log(this.state.account)
    let content
    

    if (this.state.loading){
      content = <p id = 'loader' className='text-center'>Loading....</p>
      
    }else {
      content = <Main
      ethBalance={this.state.ethBalance}
      tokenBalance={this.state.tokenBalance}
      buyTokens={this.buyTokens}
      sellTokens={this.sellTokens}
    />
    }
    return (
      <div>
        
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style = {{ maxWidth : '600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.mycryptoexchange.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
                {content}
            
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
