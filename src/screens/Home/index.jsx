import React, { Component } from 'react';
import logo from './github_logo.svg';

class Home extends Component {

    /**
     * submitHandler users React Router 
     * to push the user to a URL containing 
     * the username that has been submitted
     */
    submitHandler = event => {
        /**
         * .preventDefault() prevents the default 
         * action from the event from tiggering
         */
        event.preventDefault();
        let route = `/${event.target.elements['username'].value}`;
        // console.log(event.target.elements['username'].value);
        this.props.history.push(route);
    }

    render() {
        return (
            <div className="home">
                <img src={logo} alt="GitHub Logo" className="app-logo" />
                <h1>Github Employability Profiler</h1>

                <form action="#" onSubmit={this.submitHandler} className="username-form">
                    <input 
                        type="text" 
                        placeholder="Enter Github Username..."
                        name="username" 
                        id="username_input" 
                        className="form-control username-form--username-input username-form--input" 
                        required
                    />
                    <button 
                        type="submit" 
                        className="username-form--submit btn username-form--input">
                        GO
                    </button>
                </form>
            </div>
        );
    }
}

export default Home;