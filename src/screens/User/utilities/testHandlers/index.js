// const eventRangeHandler = () => {
//     return true;
// };

/**
 * parseDate
 * Returns a valid date string for Safari compatibility.
 * Replaces '-' in string with '/', replaces non-numeric characters with ' '
 * @param {string} date 
 */
const parseDate = date => {
    const parsed = Date.parse(date);
    if (!isNaN(parsed)) {
      return parsed;
    }
  
    return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
}

/**
 * testQuery
 * @param {object} test  The test that is currently running
 * @param {object} state The state that the test is referencing values
 */
const testQuery = (test, state) => {
    const test_value = state.api_data[test.api_key];

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
    } else if (test.type === 'date_range') {
        const events = state.api_data[test.array];
        // If there are no events, fail the test
        if (events.length === 0) {
            return false;
        }

        const most_recent = parseDate(events[0].created_at);
        const today = Date.now();
        const since_recent = (today - most_recent) / 1000 / 60 / 60 / 24;        

        /**
         * If the most recent even took place since the min active period,
         * loop through all events and return the total that have occured 
         * since the end of the active period
         */
        if (since_recent <= test.min_days) {
            let n = 1; // We know that n >= 1 because it passed the above condition

            /**
             * Forloop should run for the lowest of the max events 
             * necessary to check, or the length of the events array
             */
            const total_events = Math.min(test.max_events, events.length);
            for (let i = 1; i < total_events; i++) { // The loop can start at 1 of the above statement
                const event_time = parseDate(events[i].created_at);
                const days_since = (today - event_time) / 1000 / 60 / 60 / 24;
                if (days_since <= test.max_days) {
                    n++;
                } else { 
                    break;
                }
            }

            test.answer = n;
            return n >= test.max_events ? true : test.max_events;
        } else { 
            return false;
        }
    }
};

export default testQuery;
