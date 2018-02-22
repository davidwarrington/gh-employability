const api_req = username => {
    // Use Fetch API for getting info from GitHub API
    fetch(`https://api.github.com/users/${username}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        // user_data = json;
        // console.log(user_data);
        console.log(json);

        // questions.forEach(question => {
        //     question.status = testQuery({ key: question.key });
        //     console.log(question.status);
        // });
    })
    .catch(function(ex) {
        console.log('parsing failed', ex)
    });
};

export default api_req;