const fs = require('fs');

function createTeamPage(teamInfo, outputPath){

    const glyphMap = {
        'Intern': 'fa-graduation-cap',
        'Engineer': 'fa-glasses',
        'Manager': 'fa-mug-hot'
    }

    const {company, team} = teamInfo;

    const employeeCards = team.map(x => 
        {
            const role = x.getRole();
            let property;
            switch (role){
                case 'Intern':
                    property = `School: ${x.getSchool()}`;
                    break;
                case 'Engineer':
                    property = `GitHub: <a target="_blank" href="https://github.com/${x.getGitHub()}">${x.getGitHub()}</a>`;
                    break;
                case 'Manager':
                    property = `Office number: ${x.getOfficeNumber()}`;
                    break;
                default:
                    property = '';
            }
            return `
    <div class="card custom-card" style="width: 18rem;">
        <div class="card-body custom-title">
        <h5 class="card-title">${x.getName()}</h5>
        <span><i class="fa-solid ${glyphMap[role]}"></i></span> ${role}
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${x.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:${x.getEmail()}">${x.getEmail()}</a></li>
        <li class="list-group-item">${property}</li>
        </ul>
    </div>
    `;
        });
    
    const employeesElements = employeeCards.reduce((html, card) => html + '\n' + card, '');
    

    const content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    <link rel="stylesheet" href="./styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <title>My Team</title>
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">My Team @ ${company}</h1>
            </div>
        </div>
        <main class="container">
          <div class="row d-flex justify-content-center">
          ${employeesElements}
          </div>
        </main>
    </body>
    </html>`;
    fs.writeFile(outputPath, content, err => {if(err)console.log(err);});
}

module.exports = createTeamPage;
