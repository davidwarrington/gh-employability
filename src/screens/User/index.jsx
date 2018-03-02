import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import TaskCard from './components/TaskCard';
import NavButton from './components/Task__NavButton';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            avatar_url: '#',
            api_data: null,
            api_tests: [
                { id: 'has_name', api_key: 'name', status: false, type: 'boolean', answer: null },
                { id: 'has_bio', api_key: 'bio', status: false, type: 'boolean', answer: null },
                { id: 'has_company', api_key: 'company', status: false, type: 'boolean', answer: null }
            ],
            tests_complete: false,
            current_test: 0
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
                    avatar_url: this.state.api_data.avatar_url
                })
            })
            .then(() => {
                this.state.api_tests.forEach(test => {
                    // console.log(test);
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

    taskNavHandler = (p) => {
        this.setState({ current_test: p })
    }

    render() {
        return (
            <div className="container-fluid">
                <Header 
                    username={this.state.username} 
                    match={this.props.match} 
                    avatar_url={this.state.avatar_url}
                />
                <Route 
                    exact
                    path="/:username"
                    render={() => <div>
                                    <ul className="row list-unstyled">
                                        <TaskCard test={this.state.api_tests[this.state.current_test]} index={this.state.current_test} />
                                        {/* <TaskCard test={this.state.api_tests[this.state.next_test]} index={this.state.next_test} /> */}
                                    </ul>
                                    <div className="btn-group">
                                        {/* <button 
                                            className="btn btn-info"
                                            onClick={this.changeTaskHandler}>
                                            Previous
                                        </button>
                                        <button 
                                            className="btn btn-info"
                                            onClick={this.changeTaskHandler}>
                                            Next
                                        </button> */}
                                        <NavButton 
                                            text="Previous"
                                            task_index={this.state.current_test - 1}
                                            navHandler={this.taskNavHandler}
                                        />
                                        <NavButton 
                                            text="Next"
                                            task_index={this.state.current_test + 1}
                                            navHandler={this.taskNavHandler}
                                        />
                                    </div>
                                  </div>
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