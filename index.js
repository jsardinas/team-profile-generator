const getTeamInfo = require('./src/get_team');
const createTeamPage = require('./src/create_page')

getTeamInfo()
.then(teamInfo => {
    console.log('Creating team page ...');
    createTeamPage(teamInfo, './dist/index.html');
    console.log('Done!');
});
