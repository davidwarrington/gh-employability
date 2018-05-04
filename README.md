# GitHub Employability Profiler

Project by David Warrington

This project makes used of the ReactJS framework. It was bootstrapped using the Create-React-App project. It can be seen live at [gh.davidwarrington.co.uk](https://gh.davidwarrington.co.uk).

## Table of Contents
- [How to develop](#how-to-use)
  - [Adding New Tests](#adding-new-tests)
  - [Adding Test Types](#adding-test-types)
- [Tools Used](#tools-used)
- [Scripts](#scripts)

## How to develop

After downloading a copy of this repository, one should run the following commands:
1. `npm install`: This will install all dependencies listed in `package.json`.
2. `npm start`: This starts a local development server for the project.

In order to make styling changes, this project uses SASS. In order to edit the SASS do the following:
1. `gulp`: This runs the default `gulp` task, watching `.scss` files in `assets/sass` for changes.

### Adding New Tests

In order to add a new test, find the `test.jsx` file in `src/screens/User/data`. This contains an array of tests that run against the GitHub API.
Tests must be written in the following manner:
```js
{ 
    id: 'id',
    api_key: 'api_key',
    type: 'type',
    title: 'title',
    message: function () {
        var message;
        if (this.status === true) {
            message = `Pass message`;
        } else {
            message = `Fail message`;
        }
        return (<p>{message}</p>);
    }
}
```

The keys are used for the following:
1. *id* is used to describe what the test is to developers.
2. *api_key* tells the script which GitHub API key to test.
3. *type* defines the type of test to run (three are currently possible, boolean, range and date_range).
4. *title* is used by React to give the relevant card a title.
5. *message* is used to determine what the card should say depending on the status of the test. If the test status is 'true', it has passed, 'false' and it has failed, anything else is a 'min_pass' state, which is used by test types such as range. This allows as many different pass messages to be used as the developer defines.

### Adding Test Types

Sometimes using the predefined test types is not possible, and so adding a new one is necessary. In this case do the following:
1. Open `index.js` in `src/screens/User/utilities/testHandlers`.
2. Add an `else if` statement to the `if` statement used evaluating test types.
3. Within this `else if` code block, write the code to evaluate the new test type.

## Tools Used

As stated previously, this project makes use of the *Create-React-App* project, with all of the tools included, such as *React*, *Webpack* and *Jest*. The project also makes use of *Gulp*, *Gulp-SASS* and *Gulp-Autoprefixer*. These are used for styling the web app. *React Router* is used to handle route changes, and *GH-Pages* is used to deploy a production copy of the web app to GitHub pages.

## Scripts
* `gulp` - Runs the default Gulp task, watching `.scss` files for changes.
* `npm start` - Runs webpack and watches for changes to source files.
* `npm run build` - Creates a production ready copy of the source files, with ES6 transpiled to ES5.
* `npm run deploy` - Runs the `build` command, before using the `gh-pages` package to deploy the project to the gh-pages branch.
