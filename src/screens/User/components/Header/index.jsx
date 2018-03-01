import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const btn = this.props.match.isExact 
                    ? { text: 'View All', url: `${this.props.match.url}/all` } 
                    : { text: 'View Previous', url: `${this.props.match.url}` };

        return (
            <header className="row">
                <div className="col-12">
                    <h2>{this.props.username}</h2>
                    <Link 
                        to={btn.url} 
                        className="btn btn-info">
                            {btn.text}
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;