import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    render() {
        const btn = this.props.match.isExact 
                    ? { text: 'View All', url: `${this.props.match.url}/all` } 
                    : { text: 'View Previous', url: `${this.props.match.url}` };

        return (
            <header className="header" id="page-top">
                {/* <nav className="navbar navbar-expand-sm navbar-light justify-content-space-between">
                    <div className="container-fluid"> */}
                        <img 
                            src={this.props.avatar_url} 
                            alt={this.props.username} 
                            className="user--avatar" 
                        />
                        <h2 className="user--username">
                            {this.props.username}  
                        </h2>

                        <nav className="nav">
                            <ul className="nav--list">
                                <li
                                    className="nav--item nav--item__primary">
                                    <Link 
                                        to={btn.url} 
                                        className="nav--link">
                                            {btn.text}
                                    </Link>
                                </li>
                                <li 
                                    className="nav--item nav--item__danger">
                                    <Link
                                        to='/'
                                        className="nav--link">
                                        Exit
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    {/* </div>

                </nav> */}
            </header>
        );
    }
}

export default Header;