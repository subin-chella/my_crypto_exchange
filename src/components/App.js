import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from './Navbar'

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

    console.log(ethBalance)


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

  constructor (props){

    super(props)
    this.state= {
      //account : ''

    }
   // this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)

  }

  render() {
    console.log(this.state.account)
    return (
      <div>
        
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.mycryptoexchange.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
                <h1>Tamil Crypto Exchange</h1>
            
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
