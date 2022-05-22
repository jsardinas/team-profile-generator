const inquirer = require('inquirer');
const Intern = require('./intern');
const Engineer = require('./engineer');
const Manager = require('./manager');
const utils = require('./utils');

async function getTeamInfo(){

    const attrMap = {
        'Intern': 'school',
        'Engineer': 'github username',
        'Manager': 'office number'
    }

    const companyQuestions = [
        {
            name: 'company',
            message: 'What is the name of the company? '
        },
        {
            type: 'input',
            name: 'employeeCount',
            message: 'How many employees are on your team? ',
            validate: x => (isNaN(parseInt(x)) || parseInt(x) <= 0) ? 'Please enter a whole positive number': true,
            filter: x => isNaN(parseInt(x)) ? x : parseInt(x, 10)
        }
    ];

    const {company, employeeCount} = await inquirer.prompt(companyQuestions);
    const emailDomain = utils.generateEmailDomain(company);

    const employeeQuestions = [
        {
            name: 'name',
            message: 'Employee name: '
        },
        {
            name: 'email',
            message: 'Employee email: ',
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {
            type: 'list',
            name: 'role',
            message: 'Employee Role: ',
            choices: ['Intern', 'Engineer', 'Manager']
        },
        {   name: 'attr',
            message: ans => `Enter ${ans.role.toLowerCase()} ${attrMap[ans.role]}`
        }
    ];

    var employees = [];
    for(let i = 0; i < employeeCount; ++i){
        console.log(`Creating employee ${i+1} of ${employeeCount}`);
        employees.push(await inquirer.prompt(employeeQuestions));
    }
    return employees.map(x => {
        switch(x.role){
            case 'Intern':
                return new Intern(x.name, x.email, x.attr);
            case 'Engineer':
                return new Engineer(x.name, x.email, x.attr);
            case 'Manager':
                return new Manager(x.name, x.email, x.attr);
        }
    });
}

module.exports = getTeamInfo;