import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';

let username = 'davidwarrington';

let user_data;

// Use Fetch API for getting info from GitHub API
fetch(`https://api.github.com/users/${username}`)
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    user_data = json;
    console.log(user_data)
    questions.forEach(question => {
      question.status = testQuery({ key: question.key });
      console.log(question.status);
    });
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });

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
