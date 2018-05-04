/**
 * We import React from 'react' here to allow the compiler, to 
 * compile JSX, which allows us to write HTML within our JS code.
 */
import React from 'react';

/**
 * An array of tests that will be used by the web app.
 *
 * The standard function() declaration has been used 
 * instead of arrow functions within these tests 
 * as arrow functions do not have a 'this' value, 
 * therefore object properties have to be passed as 
 * function parameters, requiring the functions to 
 * be called elsewhere.
 */
const tests = [
    { 
        id: 'has_name',
        api_key: 'name',
        type: 'boolean',
        title: 'Name',
        message: function () {
            var message;
            if (this.status === true) {
                message = `Congrats! Employers can see that you are ${this.answer}.`;
            } else {
                message = `You have no name set. Change this to let an employer know who you are.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'has_bio', 
        api_key: 'bio', 
        type: 'boolean', 
        title: 'Bio',
        message: function () {
            var message;
            if (this.status === true) {
                message = `You have a bio! Hopefully this leaves employers with a good impression of you.`;
            } else {
                message = `Write a brief bio to give potential employers an idea of what makes you tick.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'has_email', 
        api_key: 'email', 
        type: 'boolean', 
        title: 'Email',
        message: function () {
            var message;
            if (this.status === true) {
                message = `Congrats! Employers can contact you here: ${this.answer}.`;
            } else {
                message = `You have no email address available. Change this to let employers contact you.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'has_website', 
        api_key: 'blog', 
        type: 'boolean', 
        title: 'Website',
        message: function() {
            var message;
            if (this.status === true) {
                message = `You have a website available for employers to see!`;
            } else {
                message = `Employers might prefer to look at a portfolio website, you should share a link to yours via the profile settings.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'has_location',
        api_key: 'location',
        type: 'boolean',
        title: 'Location',
        message: function() {
            var message;
            if (this.status === true) {
                message = `Employers in the region of ${this.answer} may be more keen to contact you.`;
            } else {
                message = `There is no location associated with your account. Doing so will let employers know if they're looking at somebody local.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'is_hireable', 
        api_key: 'hireable', 
        type: 'boolean', 
        title: 'Hireable',
        message: function () {
            var message;
            if (this.status === true) {
                message = `You're letting employers know that you are hireable.`;
            } else {
                message = `You're profile says you're not hireable.`;
            }
            return (<p>{message}</p>);
        }
    },
    { 
        id: 'num_repos', 
        api_key: 'public_repos', 
        type: 'range', 
        min_val: 1, 
        max_val: 4, 
        title: 'Public Repositories',
        message: function () {
            var message;
            if (this.status === true) {
                message = `You have ${this.answer} public code repositories. This should be enough to demonstrate your abilities.`;
            } else if (this.status === false) {
                message = `You have no public code repositories. Change this to let employers see what you can do!`;
            } else {
                message = `You have less than ${this.max_val} public repositories. You should consider sharing more projects for employers to get a better understand of what you're capable of.`;
            }
            return (<p>{message}</p>);
        }
    },
    {
        id: 'is_active',
        api_key: 'created_at',
        array: 'events',
        type: 'date_range',
        min_days: 7,
        max_days: 21,
        max_events: 8,
        title: 'Active Account',
        message: function () {
            var message;
            if (this.status === true) {
                message = `You've done at least ${this.answer} things publicly with your account recently. This is great, people can see you are actively working on projects.`;
            } else if (this.status === false) {
                message = `Your account would appear to be abandoned. Try being more active to show that you are still writing code.`;
            } else {
                message = `There have been ${this.answer} events associated with you in the past ${this.max_days} days. Your account doesn't look abandoned but it's recommended that you start using it more.`;
            }
            return (<p>{message}</p>);
        }
    }
];

/**
 * Export the 'tests' array from this 
 * file, ready to be imported elsewhere.
 */
export default tests;