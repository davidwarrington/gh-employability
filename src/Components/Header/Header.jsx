import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const header = () => {
    return (
        <header>
            <img src="#" alt="#"/>
            <h2>Username</h2>
            <button>View All</button>
            <Link to={'/'}>Back</Link>
        </header>
    );
};

export default header;