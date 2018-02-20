import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';

const Home = () => (
  <UsernameInput />
);

const TaskView = (props) => (
  <div>
    <Header username={props.match.params.username} />
  </div>
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
