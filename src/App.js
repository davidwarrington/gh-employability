import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/**
 * Import Screens
 */
import Home from './screens/Home';
import User from './screens/User';

class App extends Component {
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
            path="/:username" // /:username and /:username/all both match this route
            render={({ match, history }) => <User match={match} history={history}/>}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
