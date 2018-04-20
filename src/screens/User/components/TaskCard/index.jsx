import React, { Component } from 'react';

import IgnoreButton from '../IgnoreButton';

import './TaskCard.css';

class TaskCard extends Component {
    answer = test => {
        if (test.status === true) {
            return test.pass_message();
        } else if (test.type === 'boolean') {
            return test.fail_message; 
        } else if (test.type === 'range') {
            if (test.status === false) {
                return test.fail_message; 
            } else {
                return test.min_pass_message();
            }
        } else if (test.type === 'date_range') {
            if (test.status === false) {
                return test.fail_message;
            } else {
                return test.min_pass_message();
            }
        }
    }

    render() {
        return (
            <li 
                className="task-card--container"
            >
                <div className="task-card">
                    {this.answer(this.props.test)}
                    <div className="task-card--controls">
                        <IgnoreButton 
                            taskIgnoreHandler={this.props.taskIgnoreHandler} 
                            test={this.props.test} 
                            index={this.props.index}
                        />
                        {this.props.hideRecheck 
                            ? null
                            : <button 
                                className="task-card--control-button btn"
                                onClick={this.props.apiFetchHandler}>
                                Check Again
                            </button>
                        }
                    </div>
                </div>
            </li>
        )
    }
}

export default TaskCard;