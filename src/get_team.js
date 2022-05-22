const inquirer = require('inquirer');
const utils = require('./utils');
const getEmployee = require('./employee_factory');

async function getTeamInfo(){

    const attrMap = {
        'intern': 'school',
        'engineer': 'github username',
        'manager': 'office number'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const companyQuestion = [
        {
            name: 'company',
            message: 'What is the name of the company? ',
            validate: ans => ans !== "" || "Cannot be empty"
        },
    ];

    const {company} = await inquirer.prompt(companyQuestion);
    const emailDomain = utils.generateEmailDomain(company);


    const employeeQuestions = [
        {
            name: 'name',
            message: "Enter the manager's name: ",
            validate: ans => ans !== "" || "Cannot be empty"
        },
        {
            name: 'email',
            message: ans => `Enter ${ans.name} email: `,
            default: ans => `${ans.name}@${emailDomain}.com`,
            validate: answer => emailRegex.test(answer) || "Invalid email address"
        },
        {
            name: 'attr',
            message: '',
            validate: ans => ans !== "" || "Cannot be empty"
        }
    ];

    let role = 'manager';
    employeeQuestions[2].message = ans => `Enter ${ans.name} ${attrMap[role]}: `;

    let answerManager = await inquirer.prompt(employeeQuestions);
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

    let ans = await inquirer.prompt(menuQuestion);
    //console.log(ans.menu);
    while (ans.menu !== 'Quit'){
        role = ans.menu.split(' ')[2];
        employeeQuestions[0].message = ans => `Enter ${role} name: `;
        employeeQuestions[2].message = ans => `Enter ${ans.name} ${attrMap[role]}: `;
        let answers = await inquirer.prompt(employeeQuestions);
        answers['role'] = role;
        team.push(getEmployee(answers));
        ans = await inquirer.prompt(menuQuestion);
    }
    console.log(team);
    return {'team':team, 'company':company};
}

module.exports = getTeamInfo;