import React from 'react';

const tests = [
    { 
        id: 'has_name', 
        api_key: 'name', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>You have no name set. Change this to let an employer know who you are.</p>, 
        pass_message: function() { return `Congrats! Employers can see that you are ${this.answer}.` } 
    },
    { 
        id: 'has_bio', 
        api_key: 'bio', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>Write a brief bio to give potential employers an idea of what makes you tick.</p>, 
        pass_message: function() { return `Your bio reads: "${this.answer}". Hopefully this leaves employers with a good impression of you.` } 
    },
    { 
        id: 'has_email', 
        api_key: 'email', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>You have no email address available. Change this to let employers contact you.</p>, 
        // pass_message: val => <p>Congrats! Employers can contact you here: <a href={`mailto:${val}`}>{val}</a>.</p> 
        pass_message: function() { return `Congrats! Employers can contact you here: ${this.answer}.` }
    },
    { 
        id: 'has_website', 
        api_key: 'blog', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>Employers might prefer to look at a portfolio website, you should share a link to yours via the profile settings.</p>,
        // pass_message: val => <p>Employers can see your work here: <a href={val}>{val}</a>.</p> 
        pass_message: function() { return `Employers can see your work here: ${this.answer}` }
    },
    { 
        id: 'has_location', 
        api_key: 'location', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>There is no location associated with your account. Doing so will let employers know if they're looking at somebody local</p>,
        pass_message: function() { return `Employers in the region of ${this.answer} may be more keen to contact you.` }
    },
    { 
        id: 'is_hireable', 
        api_key: 'hireable', 
        status: false, 
        ignored: false, 
        type: 'boolean', 
        answer: null, 
        fail_message: <p>You're profile says you're not hireable. An employer might not choose to ignore that.</p>,
        pass_message: function() { return `You're letting people know that you are hireable.` }
    },
    { 
        id: 'num_repos', 
        api_key: 'public_repos', 
        status: false, 
        ignored: false, 
        type: 'num', 
        answer: null, 
        min_val: 1, 
        max_val: 4, 
        fail_message: <p>You have no public code repositories. Change this to let employers see what you can do!</p>, 
        min_pass_message: function() { return `You have less than ${this.max_val} public repositories. This is a good start, but you should consider sharing more projects for employers to get a better understand of what you're capable of.` },
        pass_message: function() { return `You have ${this.answer} public code repositories. This should be enough to demonstrate your abilities.` }
    },
    {
        id: 'is_active',
        api_key: 'created_at',
        array: 'events',
        status: false,
        ignored: false, 
        type: 'date_range',
        answer: null,
        min_days: 7,
        max_days: 21,
        max_events: 8,
        fail_message: <p>Your account would appear to be abandoned. Try pushing being more active to show that you are still writing code.</p>,
        min_pass_message: function() { return `There have been ${this.answer} events associated with you in the past ${this.max_days} days. Your account doesn't look abandoned but it's recommended that you start using it more.` },
        pass_message: function() { return `You've done at least ${this.answer} things publicly with your account recently. This is great, people can see you are actively working on projects.` }
    }
];

export default tests;