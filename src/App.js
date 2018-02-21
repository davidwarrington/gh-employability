import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';


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
