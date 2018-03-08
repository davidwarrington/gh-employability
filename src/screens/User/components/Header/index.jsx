import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const btn = this.props.match.isExact 
                    ? { text: 'View All', url: `${this.props.match.url}/all` } 
                    : { text: 'View Previous', url: `${this.props.match.url}` };
        
        const avater_style = {
            maxHeight: '47px'
        }

        return (
            <header className="bg-light" id="page-top">
                <nav className="navbar navbar-expand-sm navbar-light justify-content-space-between">
                    <div className="container-fluid">
                        <img 
                            src={this.props.avatar_url} 
                            alt={this.props.username} 
                            className="rounded" 
                            style={avater_style}
                        />
                        <a 
                            href="#page-top" 
                            className="navbar-brand ml-2"
                        >
                            {this.props.username}
                        </a>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <div className="btn-group">
                                    <li
                                        className="nav-item btn btn-sm btn-info">
                                        <Link 
                                            to={btn.url} 
                                            className="nav-link text-light">
                                                {btn.text}
                                        </Link>
                                    </li>
                                    <li 
                                        className="nav-item btn btn-sm btn-danger">
                                        <Link
                                            to='/'
                                            className="nav-link text-light">
                                            Exit
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>

                </nav>
            </header>
        );
    }
}

export default Header;