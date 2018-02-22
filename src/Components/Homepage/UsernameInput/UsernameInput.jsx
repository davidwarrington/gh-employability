import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../../logo.svg';

const usernameInput = (props) => {
    return (
        <div className="usernameInput">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">GitHub Employability Profiler</h1>
                <form action="/">
                    <input type="text" onChange={props.change} />
                    <button type="submit" onClick={props.submit}>
                        <Link to={'/' + props.username}>GO</Link>
                    </button>
                </form>
            </header>
        </div>  
    );
};

export default usernameInput;