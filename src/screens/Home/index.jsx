import React, { Component } from 'react';
import './index.css';
import logo from './github_logo.svg';

class Home extends Component {

    submitHandler = event => {
        event.preventDefault();
        let route = `/${event.target.elements['username'].value}`;
        // console.log(event.target.elements['username'].value);
        this.props.history.push(route);
    }

    render() {
        return (
            <div className="home container-fluid d-flex flex-column justify-content-center bg-light">
                <img src={logo} alt="GitHub Logo" className="app-logo mb-3 mx-auto" />
                <h1 className="text-center">Github Employability Profiler</h1>

                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 mx-auto">
                        <form action="#" onSubmit={this.submitHandler}>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Enter Github Username..."
                                    name="username" 
                                    id="username_input" 
                                    className="form-control" 
                                />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-info">GO</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;