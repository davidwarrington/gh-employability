import React, { Component } from 'react';

class TaskCard extends Component {
    answer = test => {
        if (this.props.test.type === 'boolean') {
            return `Your ${test.api_key} is: "${test.answer}"`; 
        }
    }

    render() {
        return (
            <li 
                className="col-3"
            >{this.answer(this.props.test)}</li>
        )
    }
}

export default TaskCard;