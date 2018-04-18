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
                className="task-card col-12 col-md-3 mx-auto"
            >
                <div className="task-card--container py-2 d-flex flex-column justify-content-between align-items-center">
                    {this.answer(this.props.test)}
                    <div className="btn-group">
                        <IgnoreButton 
                            taskIgnoreHandler={this.props.taskIgnoreHandler} 
                            test={this.props.test} 
                            index={this.props.index}
                        />
                        {this.props.hideRecheck 
                            ? null
                            : <button 
                                className="btn btn-success"
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