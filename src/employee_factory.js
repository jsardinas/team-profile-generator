const Intern = require('./intern');
const Engineer = require('./engineer');
const Manager = require('./manager');

function getEmployee(json){
    switch(json.role){
        case 'manager':
            return new Manager(json.name, json.email, json.attr);
        case 'engineer':
            return new Engineer(json.name, json.email, json.attr);
        case 'intern':
            return new Intern(json.name, json.email, json.attr);
    }
}

module.exports = getEmployee;