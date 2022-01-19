pragma solidity 0.5.16;

import "./Token.sol";

contract CryptoExchange {
    string public name = "Crypto Exchange instance";

    Token public token;
    //Redemption rate is the number of token per ether. We keep it as 100
    uint public rate =100;


    event TokenPurchased(

        address account,
        address token,
        uint amount,
        uint rate

    );

     event TokenSold(

        address account,
        address token,
        uint amount,
        uint rate

    );
    constructor(Token _token) public {
        token = _token;

    }


    function buyTokens() public payable{
      
        // Etherium * Redemption rate
        uint tokenAmount =  msg.value * rate;

        require (token.balanceOf(address(this)) >= tokenAmount);
        token.transfer(msg.sender, tokenAmount);

        // Emit an event token purchased

        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public payable  { 

        //Verify if the user has enough token to sell
        require(token.balanceOf(msg.sender) >= _amount);


      
        // Calculate the amount of ether
        uint etherCount =  _amount / rate;
      
        
        // Verify if the exchange has enough ether
       require(address(this).balance >= etherCount);
      
      
      //Transform token from sender to echange
       token.transferFrom(msg.sender, address(this), _amount);

      // Transfer ether to the sender  
        msg.sender.transfer(etherCount);

        // Emit an event token purchased

        emit TokenSold(msg.sender, address(token), _amount, rate);
    }


}