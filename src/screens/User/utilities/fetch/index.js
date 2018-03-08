// import eventRangeHandler from '../testHandlers';
import testQuery from '../testHandlers';

const api_fetch = component => {

    /**
     * Create a copy of the component state so that once all changes are complete
     * the component state can be updated at once reducing unecessary re-renders
     */
    const temp_state = component.state;

    // console.log('attempt made');

    // Use Fetch API for getting info from GitHub API
    fetch(`https://api.github.com/users/${component.state.username}`)
        .then(response => response.json())
        .then(json => {
            json.message === 'Not Found'
                ? console.error('User does not exist')
                : temp_state.api_data = json;
        })
        .then(() => {
            temp_state.username = temp_state.api_data.login;
            temp_state.avatar_url = temp_state.api_data.avatar_url;
        })


        .then(() => fetch(`https://api.github.com/users/${component.state.username}/events`))
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            // Handle events results
            temp_state.api_data.events = json;
        })


        .then(() => {
            temp_state.api_tests.forEach((test, index) => {
                test.status = testQuery(test, temp_state);
            });
        })
        .then(() => component.setState(temp_state))
        .catch(ex => console.log('Parsing Failed', ex));

}

export default api_fetch;