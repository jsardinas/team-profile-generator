const fs = require('fs');

function generateEmailDomain(name){
    return name.split(' ').map(x => x.toLowerCase()).join('');
}

function getNextId(){
    content = fs.readFileSync('./db/id.db','utf-8');
    content = Number(content) + 1;
    fs.writeFileSync('./db/id.db', content.toString());
    return content;
}

module.exports = {'generateEmailDomain':generateEmailDomain, 'getNextId':getNextId};