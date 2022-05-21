const Employee = require('./employee');

class Engineer extends Employee{
    constructor(id, name, email, githubUserName){
        super(id, name, email);
        this.githubUserName = githubUserName
    }

    getGitHub(){
        return this.githubUserName;
    }

    getRole(){
        return 'Engineer';
    }
}

module.exports = Engineer;