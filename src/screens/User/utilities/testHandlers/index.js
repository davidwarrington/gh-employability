/**
 * parseDate
 * Returns a valid date string for Safari compatibility.
 * Replaces '-' in string with '/', replaces non-numeric characters with ' '
 * @param {string} date 
 */
const parseDate = date => {
    const parsed = Date.parse(date);
    /**
     * If the browser can parse the date string, return that parse value.
     */
    if (!isNaN(parsed)) {
      return parsed;
    }
  
    /**
     * If the browser was unable to parse the date string pass to the function,
     * convert the string to a valid string for the browser and parse again.
     */
    return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
}

/**
 * testQuery
 * @param {object} test  The test that is currently running
 * @param {object} state The state from which the test is referencing values
 */
const testQuery = (test, state) => {
    /**
     * Get the test value from the 
     * 'api_data' of the state object
     */
    const test_value = state.api_data[test.api_key];

    /**
     * An if...else statement is being used to 
     * differentiate between test types.
     * 
     * Some tests only check to see if a 
     * property has a value, whereas others 
     * are more complicated
     */

    /**
     * The 'boolean' test type has 
     * two possible outcomes: pass
     * or fail.
     * 
     * If the property has a value, 
     * pass the test, and set the 
     * test answer to that value,
     * otherwise, fail the test.
     */
    if (test.type === 'boolean') {
        if (test_value) {
            test.answer = test_value;
            return true;
        } else {
            return false;
        }
    } 
    /**
     * The 'range' test type has three 
     * possible outcomes: pass, min_pass 
     * or fail.
     * 
     * To pass the test, the tested property 
     * must be greater than or equal to a 
     * maximum value. If it is, the test is 
     * passed by returning 'true', and the 
     * test answer property is set to the 
     * tested value.
     * 
     * Failing that, the test checks if the
     * tested property is greater than a 
     * minimum value. If it is, the test is 
     * granted a weak, or min pass. Like 
     * before, the test answer is set to the 
     * value of the tested property, however 
     * that value is also used as the test 
     * status.
     * 
     * If both of the above fail, fail the 
     * test by returning 'false'.
     */
    else if (test.type === 'range') {
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
    /**
     * The 'date_range' test type is 
     * similar to the range test type, 
     * however it is used test the 
     * number of events between a 
     * given date range.
     * 
     * Again, this test has three 
     * possible outcomes: pass, 
     * min_pass or fail.
     * 
     * First of all the test ensure 
     * that there are some events 
     * within the array being tested 
     * and that the latest event 
     * has happened since the minimum 
     * date given.
     * 
     * A pass is granted if there have been 
     * at least a maximum number of events 
     * between the given time period.
     * 
     * A min_pass is granted if there have 
     * been 
     */
    else if (test.type === 'date_range') {
        const events = state.api_data[test.array];
        /**
         * If there are no events, 
         * fail the test immediately
         */
        if (events.length === 0) {
            return false;
        }

        /**
         * The variables below are:
         * 
         * - The most revent event date, 
         *   in ms, since 01 January, 1970
         * - The current date, 
         *   in ms, since 01 January 1970
         * - The number of days between the most recent event and the
         *   current day
         */
        const most_recent = parseDate(events[0].created_at);
        const today = Date.now();
        /** x/1000/60/60/24 is used to convert ms into days */
        const since_recent = (today - most_recent) / 1000 / 60 / 60 / 24;        

        /**
         * If the most recent even took place since the min_active period,
         * loop through all events and return the total that have occured 
         * since the end of the active period
         * 
         * Otherwise fail the test because the last event happened too 
         * long ago for the account to considered active
         */
        if (since_recent <= test.min_days) {
            /**
             * We know that n >= 1 because it 
             * passed the above condition, so 
             * n can be set to 1.
             */
            let n = 1;

            /**
             * Forloop should run for the lowest of the max events 
             * necessary to check, or the length of the events array
             */
            const total_events = Math.min(test.max_events, events.length);

            /**
             * This Forloop begins at an index of 1 because we already 
             * know that there has been at least one event in the given 
             * time period to grant a min_pass
             */
            for (let i = 1; i < total_events; i++) {
                /**
                 * Similarly to the since_recent variable above,
                 * here we calculate the number of ms between the 
                 * current event date and 01 January 1970, then we 
                 * get the number of days between the current day 
                 * and that event date.
                 */
                const event_time = parseDate(events[i].created_at);
                const days_since = (today - event_time) / 1000 / 60 / 60 / 24;
                /**
                 * If the event happened on or after the latest date 
                 * allowed, increase the value of n by 1. Otherwise 
                 * we can break out of the loop because we now that 
                 * no other events are going to pass this condition.
                 */
                if (days_since <= test.max_days) {
                    n++;
                } else { 
                    break;
                }
            }

            /**
             * Once the forLoop has finished running, the test answer 
             * can be set to n.
             * 
             * If there have been more than or equal to the max number 
             * events required to pass the test, we pass the test. 
             * 
             * Otherwise, a min_pass is granted.
             */
            test.answer = n;
            return n >= test.max_events ? true : test.max_events;
        } 
        /** Please refer to the comment at the beginning of the if...else statement */
        else { 
            return false;
        }
    }
};

/**
 * Export the testQuery function from this file.
 */
export default testQuery;
