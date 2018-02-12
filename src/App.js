import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';

let results;

// Use Fetch API for getting info from GitHub API
fetch('https://api.github.com/users/davidwarrington')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    results = json;
    console.log(results)
    questions.forEach(question => {
      question.status = testQuery({ key: question.key });
      console.log(question.status);
    });
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });

const testQuery = opts => results[opts.key] ? true : false;

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
