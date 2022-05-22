const Employee = require('./employee');

class Engineer extends Employee{
    constructor(name, email, githubUserName){
        super(name, email);
        this.githubUserName = githubUserName;
    }

    getGitHub(){
        return this.githubUserName;
    }

    getRole(){
        return 'Engineer';
    }
}

module.exports = Engineer;