const inquirer = require('inquirer');
const utils = require('./utils');
const getEmployee = require('./employee_factory');

async function getTeamInfo(){

    const companyQuestion = [
        {
            name: 'company',
            message: 'What is the name of the company? ',
            validate: ans => ans !== "" || "Cannot be empty"
        },
    ];

    const {company} = await inquirer.prompt(companyQuestion);
    const emailDomain = utils.generateEmailDomain(company);

    const managerQuestions = [
        {
            name: 'name',
            message: "Enter the manager's name: ",
            validate: ans => ans !== "" || "Cannot be empty"
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {
            name: 'attr',
            message: ans => `Enter ${ans.name} office number: `,
            validate: ans => ans !== "" || "Cannot be empty"
        }
    ];

    let answerManager = await inquirer.prompt(managerQuestions);
    answerManager['role'] = 'manager';
    const manager = getEmployee(answerManager)
    let team = [manager];

    const menuQuestion = [
        {
            name: 'menu',
            type: 'list',
            message: 'Add a team member:',
            choices: ['Add an engineer', 'Add an intern', 'Quit']
        }
    ]

    const engineerQuestions = [
        {
            name: 'name',
            message: 'Enter enginner name: ',
            validate: ans => ans !== "" || "Cannot be empty"
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {   name: 'attr',
            message: ans => `Enter ${ans.name} github account: `,
            validate: ans => ans !== "" || "Cannot be empty"
        }
    ];

    const internQuestions = [
        {
            name: 'name',
            message: 'Enter intern name: ',
            validate: ans => ans !== "" || "Cannot be empty"
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {   name: 'attr',
            message: ans => `Enter ${ans.name} school: `,
            validate: ans => ans !== "" || "Cannot be empty"
        }
    ];

    let ans = await inquirer.prompt(menuQuestion);
    //console.log(ans.menu);
    while (ans.menu !== 'Quit'){
        let role = ans.menu.split(' ')[2];
        //console.log(role);
        let questions;
        if (role == 'engineer')
            questions = engineerQuestions;
        else
            questions = internQuestions;
        let answers = await inquirer.prompt(questions);
        answers['role'] = role;
        team.push(getEmployee(answers));
        ans = await inquirer.prompt(menuQuestion);
    }
    console.log(team);
    return {'team':team, 'company':company};
}

module.exports = getTeamInfo;