import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const btn = this.props.match.isExact 
                    ? { text: 'View All', url: `${this.props.match.url}/all` } 
                    : { text: 'View Previous', url: `${this.props.match.url}` };

        return (
            <header className="bg-light" id="page-top">
                {/* <div className="col-12">
                    <img 
                        src={this.props.avatar_url} 
                        alt={this.props.username} 
                        className="rounded"
                    />
                    <h2>{this.props.username}</h2>
                    <div className="btn-group">
                        <Link 
                            to={btn.url} 
                            className="btn btn-info">
                                {btn.text}
                        </Link>
                        <Link
                            to='/'
                            className="btn btn-danger">
                            Exit
                        </Link>
                    </div>
                </div> */}

                <nav className="navbar navbar-expand-sm navbar-light justify-content-space-between">
                    <div className="container-fluid">
                        <a 
                            href="#page-top" 
                            className="navbar-brand"
                        >
                            {this.props.username}
                        </a>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <div className="btn-group">
                                    <li
                                        className="nav-item btn btn-info">
                                        <Link 
                                            to={btn.url} 
                                            className="nav-link text-light">
                                                {btn.text}
                                        </Link>
                                    </li>
                                    <li 
                                        className="nav-item btn btn-danger">
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