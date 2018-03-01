import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import TaskCard from './components/TaskCard';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            api_data: null,
            api_tests: [
                { id: 'has_name', api_key: 'name', status: false, type: 'boolean', answer: null },
                { id: 'has_bio', api_key: 'bio', status: false, type: 'boolean', answer: null },
                { id: 'has_company', api_key: 'company', status: false, type: 'boolean', answer: null }
            ],
            tests_complete: false
        }
    }

    componentWillMount() {
        // If the User screen will mount, fetch GitHub user info
        // Use Fetch API for getting info from GitHub API
        fetch(`https://api.github.com/users/${this.props.match.params.username}`)
            .then(response => response.json())
            .then(json => {
                json.message === "Not Found" ? console.error('User does not exist') : this.setState({ api_data: json });
            })
            .then(() => {
                this.setState({
                    username: this.state.api_data.login,
                })
            })
            .then(() => {
                this.state.api_tests.forEach(test => {
                    console.log(test);
                    this.testQuery(test) ? test.status = true : test.status = false;
                });
                this.setState({ tests_complete: true });
            })
            .catch(ex => console.log('Parsing Failed', ex));
    }

    testQuery = (test) => {
        if (test.type === 'boolean') {
            if (this.state.api_data[test.api_key]) {
                test.answer = this.state.api_data[test.api_key];
                return true;
            } else {
                return false;
            }
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <Header username={this.state.username} match={this.props.match} />
                <Route 
                    exact
                    path="/:username"
                    render={() => <ul className="row list-unstyled">
                                    <TaskCard test={this.state.api_tests[0]} index={0} />
                                  </ul>
                            }
                />
                <Route 
                    exact
                    path="/:username/all"
                    render={() => <ul className="row list-unstyled">
                                    {this.state.api_tests.map((test, index) => <TaskCard test={test} index={index} key={index}/>)}
                                  </ul>
                            }
                />
            </div>
        );
    }
}

export default User;