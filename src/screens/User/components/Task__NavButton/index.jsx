import React, { Component } from 'react';

class NavButton extends Component {
    changeTaskHandler = (event) => {
        this.props.navHandler(this.props.task_index);
    }

    render() {
        return (
            <button
                className="btn btn-info"
                task_index={this.props.task_index}
                onClick={this.changeTaskHandler}>
                {this.props.text}
            </button>
        );
    }
}

export default NavButton;