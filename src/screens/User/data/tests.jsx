/**
 * We import React from 'react' here to allow the compiler, to 
 * compile JSX, which allows us to write HTML within our JS code.
 */
import React from 'react';

/**
 * An array of tests that will be used by the web app.
 * 
 * The 'status', 'ignored' and 'answer' properties 
 * are not necessary however they have been used to 
 * help visualise the objects as the browser sees 
 * them during runtime.
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
        fail_message: <p>You have no name set. Change this to let an employer know who you are.</p>, 
        pass_message: function() { return `Congrats! Employers can see that you are ${this.answer}.` }, 
        title: 'Name'
    },
    { 
        id: 'has_bio', 
        api_key: 'bio', 
        type: 'boolean', 
        fail_message: <p>Write a brief bio to give potential employers an idea of what makes you tick.</p>, 
        pass_message: function() { return `You have a bio! Hopefully this leaves employers with a good impression of you.` }, 
        title: 'Bio'
    },
    { 
        id: 'has_email', 
        api_key: 'email', 
        type: 'boolean', 
        fail_message: <p>You have no email address available. Change this to let employers contact you.</p>, 
        // pass_message: val => <p>Congrats! Employers can contact you here: <a href={`mailto:${val}`}>{val}</a>.</p> 
        pass_message: function() { return `Congrats! Employers can contact you here: ${this.answer}.` }, 
        title: 'Email'
    },
    { 
        id: 'has_website', 
        api_key: 'blog', 
        type: 'boolean', 
        fail_message: <p>Employers might prefer to look at a portfolio website, you should share a link to yours via the profile settings.</p>,
        // pass_message: val => <p>Employers can see your work here: <a href={val}>{val}</a>.</p> 
        pass_message: function() { return `Employers can see your work here: ${this.answer}` }, 
        title: 'Website'
    },
    { 
        id: 'has_location', 
        api_key: 'location', 
        type: 'boolean', 
        fail_message: <p>There is no location associated with your account. Doing so will let employers know if they're looking at somebody local</p>,
        pass_message: function() { return `Employers in the region of ${this.answer} may be more keen to contact you.` }, 
        title: 'Location'
    },
    { 
        id: 'is_hireable', 
        api_key: 'hireable', 
        type: 'boolean', 
        fail_message: <p>You're profile says you're not hireable. An employer might not choose to ignore that.</p>,
        pass_message: function() { return `You're letting people know that you are hireable.` }, 
        title: 'Hireable'
    },
    { 
        id: 'num_repos', 
        api_key: 'public_repos', 
        type: 'range', 
        min_val: 1, 
        max_val: 4, 
        fail_message: <p>You have no public code repositories. Change this to let employers see what you can do!</p>, 
        min_pass_message: function() { return `You have less than ${this.max_val} public repositories. This is a good start, but you should consider sharing more projects for employers to get a better understand of what you're capable of.` },
        pass_message: function() { return `You have ${this.answer} public code repositories. This should be enough to demonstrate your abilities.` }, 
        title: 'Public Repositories'
    },
    {
        id: 'is_active',
        api_key: 'created_at',
        array: 'events',
        type: 'date_range',
        min_days: 7,
        max_days: 21,
        max_events: 8,
        fail_message: <p>Your account would appear to be abandoned. Try pushing being more active to show that you are still writing code.</p>,
        min_pass_message: function() { return `There have been ${this.answer} events associated with you in the past ${this.max_days} days. Your account doesn't look abandoned but it's recommended that you start using it more.` },
        pass_message: function() { return `You've done at least ${this.answer} things publicly with your account recently. This is great, people can see you are actively working on projects.` },
        title: 'Active Account'
    }
];

/**
 * Export the 'tests' array from this 
 * file, ready to be imported elsewhere.
 */
export default tests;