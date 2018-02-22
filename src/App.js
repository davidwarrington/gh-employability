import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

// Import React Components
import UsernameInput from './Components/Homepage/UsernameInput/UsernameInput.jsx';
import Header from './Components/Header/Header.jsx';

// Import functions for handling data in back-end
import api_req from './Functions/api';

// let user_data;

// const testQuery = opts => user_data[opts.key] ? 'complete' : 'incomplete';

// const questions = [
//   {
//     "query": "has_name",
//     "type": "boolean",
//     "key": "name",
//     "status": false
//   },
//   {
//     "query": "has_email",
//     "type": "boolean",
//     "key": "email",
//     "status": false
//   }
// ];

// console.log(questions[0].status());

const TaskView = (props) => (
  <Header 
    username={props.username} />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      user_info: null
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler = (event) => {
    event.preventDefault();
    this.apiHandler();
  }

  apiHandler = () => {
    // Use Fetch API for getting info from GitHub API
    fetch(`https://api.github.com/users/${this.state.username}`)
      .then(response => response.json())
      .then(json => {
        json.message === "Not Found" ? console.error('Uh Oh') : this.setState({ user_info: json });

          // questions.forEach(question => {
          //     question.status = testQuery({ key: question.key });
          //     console.log(question.status);
          // });
      })
      .catch(function(ex) {
          console.log('parsing failed', ex)
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Route 
              exact 
              path="/" 
              render={() => <UsernameInput 
                              {...this.state}
                              change={this.usernameChangeHandler}
                              submit={this.usernameSubmitHandler}
                            />
                     }
            />
            <Route 
              exact 
              path="/:username" 
              render={({ match }) => <TaskView
                                      {...this.state}
                                      username={match.params.username}
                                     />
                     }
            />
            <Route 
              exact 
              path="/:username/all" 
              render={({ match }) => <TaskView
                                      {...this.state}
                                      username={match.params.username}
                                     />
                     }
            />
        </div>
      </Router>
    );
  }
}

export default App;
