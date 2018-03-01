import React, { Component } from 'react';

class TaskCard extends Component {
    render() {
        return (
            <li 
                className="col-3"
            >{this.props.test.answer}</li>
        )
    }
}

export default TaskCard;