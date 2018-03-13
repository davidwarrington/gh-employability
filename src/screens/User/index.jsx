import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import TaskCard from './components/TaskCard';
import NavButton from './components/Task__NavButton';

import api_fetch from './utilities/fetch';

import tests from './data/tests.jsx';

import './user.css';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            avatar_url: '#',
            api_data: null,
            api_tests: tests,
            tests_complete: false,
            current_test: 0
        }
    }

    componentWillMount() {
        // If the User screen will mount, fetch GitHub user info
        api_fetch(this);
    }

    apiFetchHandler = () => {
        api_fetch(this);
    }

    taskNavHandler = dir => {
        this.setState({ current_test: dir })
    }

    taskIgnoreHandler = (test, index) => {
        test.ignored ? test.ignored = false : test.ignored = true;
        const newTests = this.state.api_tests;
        // console.log(index);
        // newTests[index] = test;

        this.setState({
            api_tests: newTests
        });
             
    }

    render() {
        const failed_tests = this.state.api_tests.filter(test => !test.status && !test.ignored);
        const next_test = this.state.current_test === failed_tests.length - 1 
                            ? 0 
                            : this.state.current_test + 1;
        const prev_test = this.state.current_test === 0 
                            ? failed_tests.length - 1 
                            : this.state.current_test - 1;

        return (
            <div className="user-container">
                <Header 
                    username={this.state.username} 
                    match={this.props.match} 
                    avatar_url={this.state.avatar_url}
                />
                <Route 
                    exact
                    path="/:username"
                    render={() => <div className="task-container container-fluid d-flex flex-column justify-content-center">
                                    <ul className="row list-unstyled">
                                        {failed_tests.length 
                                            ? <TaskCard 
                                                test={failed_tests[this.state.current_test]} 
                                                index={this.state.current_test} 
                                                taskIgnoreHandler={this.taskIgnoreHandler} 
                                                apiFetchHandler={this.apiFetchHandler}
                                              />
                                            : <li className="col-12">
                                                <h2 className="text-center">
                                                    There are no more tests to pass!
                                                </h2>
                                              </li>
                                        }
                                    </ul>
                                        {failed_tests.length
                                            ? <div className="task_nav row d-flex justify-content-around position-absolute w-100">
                                                <NavButton 
                                                    text="Previous"
                                                    task_index={prev_test}
                                                    navHandler={this.taskNavHandler}
                                                />
                                                <NavButton 
                                                    text="Next"
                                                    task_index={next_test}
                                                    navHandler={this.taskNavHandler}
                                                />
                                              </div>
                                            : null
                                        }
                                  </div>
                            }
                />
                <Route 
                    exact
                    path="/:username/all"
                    render={() => 
                                  <div className="user-container container-fluid">
                                    <ul className="row list-unstyled">
                                        {
                                            this.state.api_tests.map((test, index) => {
                                                return <TaskCard 
                                                    test={test} 
                                                    index={index} 
                                                    taskIgnoreHandler={this.taskIgnoreHandler} 
                                                    key={index} 
                                                    apiFetchHandler={this.apiFetchHandler} 
                                                    hideRecheck
                                                />
                                                })
                                        }
                                    </ul>
                                  </div>
                            }
                />
            </div>
        );
    }
}

export default User;