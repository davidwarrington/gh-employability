import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import TaskCard from './components/TaskCard';
import NavButton from './components/Task__NavButton';

import api_fetch from './utilities/fetch';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            avatar_url: '#',
            api_data: null,
            api_tests: [
                { id: 'has_name', api_key: 'name', status: false, type: 'boolean', answer: null, 
                    fail_message: 'You have no name set. Change this to let an employer know who you are.', 
                    pass_message: val => `Congrats! Employers can see that you are ${val}` },
                { id: 'has_bio', api_key: 'bio', status: false, type: 'boolean', answer: null, 
                    fail_message: 'Write a brief bio to give potential employers an idea of what makes you tick.', 
                    pass_message: val => `Your bio reads: "${val}". Hopefully this leaves employers with a good impression of you.` },
                { id: 'has_email', api_key: 'email', status: false, type: 'boolean', answer: null, 
                    fail_message: 'You have no email address available. Change this to let employers contact you.', 
                    pass_message: val => `Congrats! Employers can contact you here: ${val}` },
                { id: 'has_website', api_key: 'blog', status: false, type: 'boolean', answer: null, 
                    fail_message: 'Employers might prefer to look at a portfolio website, you should share a link to yours via the profile settings.',
                    pass_message: val => `Employers can your work here: ${val}` },
                { id: 'has_location', api_key: 'location', status: false, type: 'boolean', answer: null, 
                    fail_message: 'There is no location associated with your account. Doing so will let employers know if they\'re looking at somebody local',
                    pass_message: val => `Employers in the region of ${val} may be more keen to contact you.` },
                { id: 'is_hireable', api_key: 'hireable', status: false, type: 'boolean', answer: null, 
                    fail_message: 'You\'re profile says you\'re not hireable. An employer might not choose to ignore that.',
                    pass_message: () => `You're letting people know that you are hireable.` },
                { id: 'num_repos', api_key: 'public_repos', status: false, type: 'num', answer: null, 
                    min_val: 1, max_val: 4, 
                    fail_message: 'You have no public code repositories. Change this to let employers see what you can do!', 
                    min_pass_message: val => `You have less than ${val} public repositories. This is a good start, but you should consider sharing more projects for employers to get a better understand of what you're capable of`,
                    pass_message: val => `You have ${val} public code repositories. This should be enough to demonstrate your abilities.` }
            ],
            tests_complete: false,
            current_test: 0
        }
    }

    componentWillMount() {
        api_fetch(this);
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

    taskNavHandler = (p) => {
        this.setState({ current_test: p })
    }

    render() {
        const failed_tests = this.state.api_tests.filter(test => !test.status);
        const next_test = this.state.current_test === failed_tests.length - 1 
                            ? 0 
                            : this.state.current_test + 1;
        const prev_test = this.state.current_test === 0 
                            ? failed_tests.length - 1 
                            : this.state.current_test - 1;

        return (
            <div>
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
                                        <TaskCard 
                                            test={failed_tests[this.state.current_test]} 
                                            index={this.state.current_test} 
                                        />
                                    </ul>
                                    <div className="btn-group">
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