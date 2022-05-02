console.log('Before');
getUser(1, function(user) {
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
    })

});
console.log('After');

function getUser(id, callback){

    setTimeout(() => {
        console.log('reading something from the database');
        callback({ id: id, gitHubUsername: 'bsunsten'});

 
    }, 2000);
}

function getRepositories(username, callback) {

    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);


    
}