import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {

    render() {

        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="http://www.mycryptoexchange.com/bootcamp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tamil Crypto Exchange
                    </a>

                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
                            <small className='test-secondary'>
                                <small id='account'>
                                    {this.props.account}
                                </small>                                
                            </small>

                            { this.props.account 
                        ? <img
                        className ="ml-2"
                        width = '30'
                        height = '30'
                        src = {`data:image/png;base64, ${new Identicon(this.props.account, 30).toString()}`}
                        />
                        : <span></span>


                        }
                        </li>

                    </ul>



                   
                </nav>

            </div>
        );
    }
}

export default Navbar;
