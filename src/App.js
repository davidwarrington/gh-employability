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

const Home = () => (
  <UsernameInput />
);

const TaskView = () => (
  <Header />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/" component={Home}/>
            <Route exact path="/:username" component={TaskView}/>
            <Route exact path="/:username/all" component={TaskView}/>
        </div>
      </Router>
    );
  }
}

export default App;
