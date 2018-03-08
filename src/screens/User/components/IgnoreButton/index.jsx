import React, { Component } from 'react';

class IgnoreButton extends Component {
    taskIgnoreHandler = () => {
        this.props.taskIgnoreHandler(this.props.test, this.props.index);
    }

    render() {
        return (
            <button
                className="btn btn-info"
                onClick={this.taskIgnoreHandler}>
                {!this.props.test.ignored ? 'Ignore Task' : 'Stop Ignoring'}
            </button>
        );
    }
}

export default IgnoreButton;