import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

// Import React Components
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';

// Import functions for handling data in back-end
import api_req from './Functions/api';

let username = 'davidwarrington';
api_req(username);

let user_data;

const testQuery = opts => user_data[opts.key] ? 'complete' : 'incomplete';

const questions = [
  {
    "query": "has_name",
    "type": "boolean",
    "key": "name",
    "status": false
  },
  {
    "query": "has_email",
    "type": "boolean",
    "key": "email",
    "status": false
  }
];

// console.log(questions[0].status());

const TaskView = (props) => (
  <Header 
    username={props.match.params.username} />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  usernameSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event);
    // this.props.router.push();
  }

  render() {
    return (
      <Router>
        <div className="App">
            <button onClick={this.usernameHandler}>{this.state.username}</button>
            <Route 
              exact 
              path="/" 
              render={() => <UsernameInput 
                              {...this.state}
                              change={this.usernameChangeHandler}
                              submit={this.usernameSubmitHandler}
                            />}
            />
            <Route exact path="/:username" component={TaskView}/>
            <Route exact path="/:username/all" component={TaskView}/>
        </div>
      </Router>
    );
  }
}

export default App;
