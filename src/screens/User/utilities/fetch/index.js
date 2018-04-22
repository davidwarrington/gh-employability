/**
 * Import the 'testQuery' function from the testHandlers utility file (testHandlers/index.js)
 */
import testQuery from '../testHandlers';

const api_fetch = component => {

    /**
     * Establish a base url to use for API requests, 
     * based on the username passed to the component object.
     */
    const req_url = `https://api.github.com/users/${component.state.username}`;

    /**
     * Create a copy of the component state so that once all changes are complete
     * the component state can be updated at once reducing unecessary re-renders
     */
    const temp_state = component.state;

    // console.log('attempt made');

    /**
     * Use Fetch API for getting info from GitHub API
     * Fetch found here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     * 
     * Fetch uses the new Promise API to request data from a URL/URI
     */
    fetch(req_url)
        /**
         * The .then() method is used to make use of the data fetched, 
         * once the fetch promise has been resolved, the information it
         * fetches is passed as an argument to the function defined inside 
         * of .then().
         * 
         * .then() is a chainable method.
         * 
         * The .json() method parses the response as a JSON object.
         * 
         * Arrow functions have been used to reduce space in function 
         * declarations and to improve readability, for example:
         * response => response.json()
         * vs
         * function(response) {
         *  return response.json()
         * }
         */
        .then(response => response.json())
        .then(json => {
            /**
             * If the username given is not recognised by GitHub, 
             * the object returned will contain a message property 
             * with the value "Not Found".
             * 
             * If the username is not found, throw an error to 
             * escape the .then() chain, preventing unnecessary 
             * code execution, else start populating the 
             * temp_data object.
             */
            if (json.message === 'Not Found') {
                /**
                 * JS Error object found here: 
                 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
                 */
                throw new Error(`User: ${component.state.username} not found.`);
            } else {
                temp_state.api_data = json;
            }
        })
        .then(() => {
            /**
             * Assign username and avatar fields to be used in the header.
             */
            temp_state.username = temp_state.api_data.login;
            temp_state.avatar_url = temp_state.api_data.avatar_url;
        })

        /**
         * A new fetch is created to get the users 'events' info from the 
         * GitHub REST API.
         */
        .then(() => fetch(`${req_url}/events`))
        /**
         * Again, the response is converted to a JSON object.
         */
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            /**
             * Handle events results
             */
            temp_state.api_data.events = json;
        })

        /**
         * Once all fetches have been resolved, begin testing the queries
         */
        .then(() => {
            /**
             * .forEach() is an array method that will loop through 
             * each value within an array and execute a function
             * 
             * .forEach(x => y) is easier to read than: 
             * for (var i = 0; i < array.length; i++) {
             *  return array[i]
             * }
             * 
             * It is also useful in terms of being able to define a name 
             * for the array value being passed to the function.
             * 
             * In this case, the loop is looping through tests, therefore 
             * I have named each array value 'test', which increases readability
             * 
             * The second argument passed to a forEach function is the array index
             */
            temp_state.api_tests.forEach((test, index) => {
                /**
                 * Set the test status to the result of the testQuery() function
                 */
                test.status = testQuery(test, temp_state);
            });
        })

        /**
         * Once all of the above code has been executed, set the 
         * component state to the new object created earlier
         */
        .then(() => component.setState(temp_state))

        /**
         * If there is an error at any point whilst resolving 
         * the fetch, log that error to the console
         */
        .catch(err => console.log(err));

}

/**
 * Choose which variable to export from the file,
 * in this case, the function api_fetch is exported
 */
export default api_fetch;