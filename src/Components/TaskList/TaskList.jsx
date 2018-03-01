import React from 'react';

const taskList = (props) => {
    const taskCards = props.tests.map(test => {
        <li key={test.key} value={test.value}>{test.value}</li>
        test.rendered = true
    });
    return (
        <ul>
            {taskCards}
        </ul>
    );
};

export default taskList;