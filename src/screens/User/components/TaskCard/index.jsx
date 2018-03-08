import React, { Component } from 'react';

class TaskCard extends Component {
    answer = test => {
        if (test.status === true) {
            return test.pass_message(test.answer);
        } else if (test.type === 'boolean') {
            return test.fail_message; 
        } else if (test.type === 'num') {
            if (test.status === false) {
                return test.fail_message; 
            } else {
                return test.min_pass_message(test.max_val);
            }
        } else if (test.type === 'date_range') {
            if (test.status === false) {
                return test.fail_message;
            } else {
                return test.min_pass_message(test.answer, test.max_days);
            }
        }
    }

    render() {
        return (
            <li 
                className="col-12 col-md-3 col-lg-2 py-2"
            >{this.answer(this.props.test)}</li>
        )
    }
}

export default TaskCard;