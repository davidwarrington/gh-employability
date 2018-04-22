import React, { Component } from 'react';

import IgnoreButton from '../IgnoreButton';

import './TaskCard.css';

class TaskCard extends Component {
    render() {
        return (
            <li className="task-card--container">
                <div className="task-card">
                    <h2>{this.props.test.title}</h2>
                    {this.props.test.message()}
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