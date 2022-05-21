const inquirer = require('inquirer');

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

    const employeeQuestions = [
        {
            name: 'name',
            message: 'Emplyee name: '
        },
        {
            name: 'email',
            message: 'Employee email: ',
            default: ans => `${ans.name}@company.com`
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

    const {company, employeeCount} = await inquirer.prompt(companyQuestions);
    var employees = [];
    for(let i = 0; i < employeeCount; ++i){
        console.log(`Creating employee ${i+1} of ${employeeCount}`);
        employees.push(await inquirer.prompt(employeeQuestions));
    }
    
}

module.exports = getTeamInfo;