import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            api_data: null,
            api_tests: [
                { id: 'has_name', key: 'name', status: false, type: 'boolean', value: null },
                { id: 'has_bio', key: 'bio', status: false, type: 'boolean', value: null },
                { id: 'has_company', key: 'company', status: false, type: 'boolean', value: null }
            ]
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
            // .then(() => {
            //     this.state.api_tests.forEach(test => {
            //         console.log(test);
            //         this.testQuery(test) ? test.status = true : test.status = false;
            //     });
            // })
            .catch(ex => console.log('Parsing Failed', ex));
    }

    render() {
        return (
            <div className="container">
                <Header username={this.state.username} match={this.props.match} />
                <h2>{this.state.username}</h2>
                <Route 
                    exact
                    path="/:username"
                    render={() => <h2>other</h2>}
                />
                <Route 
                    exact
                    path="/:username/all"
                    render={() => <h2>all</h2>}
                />
            </div>
        );
    }
}

export default User;