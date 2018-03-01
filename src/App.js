import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

// Import React Components
// import UsernameInput from './Components/UsernameInput/UsernameInput.jsx';
// import Header from './Components/Header/Header.jsx';
// import TaskList from './Components/TaskList/TaskList.jsx';
import Home from './screens/Home';
import User from './screens/User';

// Import functions for handling data in back-end
// import api_req from './Functions/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      user_info: null,

      tests: [
        { id: 'has_name', key: 'name', status: false, type: 'boolean', value: null },
        { id: 'has_bio', key: 'bio', status: false, type: 'boolean', value: null },
        { id: 'has_company', key: 'company', status: false, type: 'boolean', value: null }
      ]
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
        json.message === "Not Found" ? console.error('User does not exist') : this.setState({ user_info: json });
      })
      .then(() => {
        this.state.tests.forEach(test => {
          this.testQuery(test) ? test.status = true : test.status = false;
        });
      })
      .catch(ex => console.log('Parsing Failed', ex));
  }

  testQuery = (test) => {
    if (test.type === 'boolean') {
      if (this.state.user_info[test.key]) {
        test.value = this.state.user_info[test.key];
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route 
            exact
            path="/" 
            component={Home}
          />
          <Route 
            path="/:username"
            render={({ match, history }) => <User match={match} history={history}/>}
          />
        </Switch>
      </Router>
      /* <Router>
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
            render={({ match }) => <div>
                                     <Header 
                                      {...this.state}
                                      username={match.params.username}
                                     />
                                     <TaskList 
                                      {...this.state}
                                     />
                                   </div>
                    }
          />
          <Route 
            exact 
            path="/:username/all" 
            render={({ match }) => <Header 
                                    {...this.state}
                                    username={match.params.username}
                                    />
                    }
          />
        </div>
      </Router> */
    );
  }
}

export default App;
