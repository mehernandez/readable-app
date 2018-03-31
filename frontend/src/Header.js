import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';


class Header extends Component {


    render() {
        return (
            <div className="App-header">
                <Link to="/"><img src={logo} className="App-logo" alt="logo" /></ Link>
                <h2>Readable</h2>
            </div>
        );
    }
}

export default Header;