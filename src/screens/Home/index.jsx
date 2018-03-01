import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
    submitHandler = event => {
        event.preventDefault();
        let route = `/${event.target.elements['username'].value}`;
        // console.log(event.target.elements['username'].value);
        this.props.history.push(route);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* <img src="#" alt="#"/> */}
                        <h1 className="text-center">Github Employability Profiler</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4 mx-auto">
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