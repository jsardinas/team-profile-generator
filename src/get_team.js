const inquirer = require('inquirer');
const Intern = require('./intern');
const Engineer = require('./engineer');
const Manager = require('./manager');
const utils = require('./utils');

async function getTeamInfo(){

    const companyQuestion = [
        {
            name: 'company',
            message: 'What is the name of the company? '
        },
    ];

    const {company} = await inquirer.prompt(companyQuestion);
    const emailDomain = utils.generateEmailDomain(company);

    const managerQuestions = [
        {
            name: 'name',
            message: "Enter the manager's name: ",
        },
        {
            name: 'email',
            message: ans =>  `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {
            name: 'office',
            message: ans => `Enter ${ans.name} office number: `,
        }
    ];

    const answerManager = await inquirer.prompt(managerQuestions);
    const manager = new Manager(answerManager.name, answerManager.email, answerManager.office);
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
            message: 'Enter enginner name: '
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {   name: 'attr',
            message: ans => `Enter ${ans.name} github account: `
        }
    ];

    const internQuestions = [
        {
            name: 'name',
            message: 'Enter intern name: '
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`
        },
        {   name: 'attr',
            message: ans => `Enter ${ans.name} school: `
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
        if (role == 'engineer')
            team.push(new Engineer(answers.name, answers.email, answers.attr));
        else
            team.push(new Engineer(answers.name, answers.email, answers.attr));
        ans = await inquirer.prompt(menuQuestion);
    }
    return {'team':team, 'company':company};
}

module.exports = getTeamInfo;