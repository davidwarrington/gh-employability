/**
 * Import external functionality from npm packages.
 * 
 * Importing 'React' allows the compiler to compile 
 * React within the document. 
 * 
 * { Component }, and { Route } declarations use 
 * ES6 Destructuring found here:
 * http://wesbos.com/destructuring-objects/
 * 
 * Destructuring allows object properties/methods to 
 * be defined as variables.
 * 
 * For example, { prop } would create a new variable 
 * called 'prop', which references the 'prop' property 
 * of the object it has come from.
 * 
 * Importing { Component } allows 'Component' to be 
 * used instead of React.Component
 * 
 * Route is being imported from React Router to allow 
 * routes to be used.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/**
 * Import Components
 */
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import NavButton from './components/Task__NavButton';

/**
 * Import utility functions
 */
import api_fetch from './utilities/fetch';

/**
 * Import the tests array
 */
import tests from './data/tests.jsx';

/**
 * Import CSS
 */
import './user.css';

/**
 * Create the 'User' component for this screen.
 * 
 * class X extends Y creates a new class, 
 * X, with all of the base properties of Y.
 */
class User extends Component {
    /**
     * This constructor function is used to initialise the class.
     * 
     * Constructor is found here: 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor
     * 
     * React Documentation shows it being used here:
     * https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
     * 
     * 'props' is added as a paramenter so that 
     * properties passed to the component can 
     * be accessed whilst setting the initial 
     * component state.
     * @param {object} props 
     */
    constructor(props) {
        /**
         * Without passing 'props' to super(),
         * 'props' still cannot be used.
         * 
         * super() calls the constructor 
         * function of the parent class. In 
         * this case, 'Component'.
         * 
         * super() can be found here:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
         */
        super(props);

        /**
         * Set the initial state for the component.
         */
        this.state = {
            username: this.props.match.params.username,
            avatar_url: '#',
            api_data: null,
            api_tests: tests,
            tests_complete: false,
            current_test: 0
        }
    }

    /**
     * If the User screen will mount, 
     * run the apiFetchHandler function to 
     * get user information from GitHub.
     * 
     * componentWillMount() found here:
     * https://reactjs.org/docs/react-component.html#componentwillmount
     */
    componentWillMount() {
        this.apiFetchHandler();
    }

    apiFetchHandler = () => {
        api_fetch(this);
    }

    taskNavHandler = test => {
        this.setState({ current_test: test });
    }

    taskIgnoreHandler = (test, index) => {
        /**
         * Check if test is already set to ignored, 
         * if it is, stop ignoring the test, else 
         * begin ignoring the test.
         */
        test.ignored ? test.ignored = false : test.ignored = true;
        /**
         * Create a copy of the api_tests in 
         * state, then use setState to update 
         * the state and force a re-render.
         */
        const newTests = this.state.api_tests;
        // console.log(index);
        // newTests[index] = test;

        this.setState({
            api_tests: newTests
        });
             
    }

    render() {
        /**
         * The default view only shows failed API tests, 
         * therefore before we render anything, we create 
         * an array of tests that have not passed, and 
         * have not been set to ignored.
         * 
         * The Array.filter() method returns a new array 
         * values that pass the given test, in this case:
         * !test.status (tests that have a falsey value), 
         * and !test.ignored (tests that are not ignored).
         */
        const failed_tests = this.state.api_tests.filter(test => !test.status && !test.ignored);

        /**
         * We need to establish the index of the next and 
         * previous array values. To do this, for the next 
         * value we use: current value + 1, unless the 
         * current value is the last value. In that case we 
         * say that the next value is 0, so that we can 
         * navigate the array as if it is an infinite loop.
         * Similarly, the previous test is equal to the 
         * current value - 1, unless we are at the beginning 
         * of the array, in which case the previous value is
         * the end of the array.
         */
        const next_test = this.state.current_test === failed_tests.length - 1 
                            ? 0 
                            : this.state.current_test + 1;
        const prev_test = this.state.current_test === 0 
                            ? failed_tests.length - 1 
                            : this.state.current_test - 1;

        /**
         * This statement returns the HTML elements, they are written using JSX
         */
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
                    render={() => <div className="task-container">
                                    <ul className="task-list">
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
                                            ? <div className="task-nav">
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
                                  <div className="all-container task-container">
                                    <ul className="task-list">
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