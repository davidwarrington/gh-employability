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
                { id: 'has_email', api_key: 'email', status: false, type: 'boolean', answer: null },
                { id: 'has_website', api_key: 'blog', status: false, type: 'boolean', answer: null },
                { id: 'has_location', api_key: 'location', status: false, type: 'boolean', answer: null },
                { id: 'is_hireable', api_key: 'hireable', status: false, type: 'boolean', answer: null },
                { id: 'num_repos', api_key: 'public_repos', status: false, type: 'num', answer: null, 
                    min_val: 1, max_val: 6 }
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
                    // console.log(test);
                    test.status = this.testQuery(test);
                });
                this.setState({ tests_complete: true });
            })
            .catch(ex => console.log('Parsing Failed', ex));
    }

    testQuery = (test) => {
        let test_value = this.state.api_data[test.api_key];
        if (test.type === 'boolean') {
            if (test_value) {
                test.answer = test_value;
                return true;
            } else {
                return false;
            }
        } else if (test.type === 'num') {
            if (test_value >= test.max_val) {
                test.answer =  test_value;
                return true;
            } else if (test_value >= test.min_val) {
                test.answer =  test_value;
                return test_value;
            } else {
                return false;
            }
        }
    };

    render() {
        let failed_tests = [];
        this.state.api_tests.forEach((test, index) => {
            if (!test.status) {
                failed_tests.push(index);
            }
        })
        console.log(failed_tests);
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
                                    {this.state.api_tests.filter(test => !test.status).map((test, index) => <TaskCard test={test} index={index} key={index}/>)}
                                  </ul>
                            }
                />
            </div>
        );
    }
}

export default User;