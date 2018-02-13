import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../../logo.svg';

const usernameInput = () => {
    return (
        <div className="usernameInput">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">GitHub Employability Profiler</h1>
                <input type="text"/>
                <button type="submit">GO</button>
                <Link to={'/forward'}>Forward</Link>
            </header>
        </div>  
    );
};

export default usernameInput;