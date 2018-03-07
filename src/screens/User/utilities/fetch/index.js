const api_fetch = (component) => {
        // If the User screen will mount, fetch GitHub user info
        // Use Fetch API for getting info from GitHub API
        fetch(`https://api.github.com/users/${component.props.match.params.username}`)
            .then(response => response.json())
            .then(json => {
                json.message === "Not Found" 
                    ? console.error('User does not exist') 
                    : component.setState({ api_data: json });
            })
            .then(() => {
                component.setState({
                    username: component.state.api_data.login,
                    avatar_url: component.state.api_data.avatar_url
                })
            })
            .then(() => {
                component.state.api_tests.forEach(test => {
                    // console.log(test);
                    test.status = component.testQuery(test);
                });
                component.setState({ tests_complete: true });
            })
            .catch(ex => console.log('Parsing Failed', ex));

}

export default api_fetch;