const Engineer = require('../src/engineer');

const name = 'Javier';
const email = `${name}@company.com`;
const githubAcct = `https://github.com/${name}`;

describe("Engineer", () => {
    describe('Objct Creation', ()=> {
        it("should create an engineer", () => {
            const engineer = new Engineer(name, email, githubAcct);
            expect(engineer.name).toEqual(name);
            expect(engineer.email).toEqual(email);
            expect(engineer.githubUserName).toEqual(githubAcct);
        });

        it("should return the appropiate role", () => {
            const engineer = new Engineer(name, email, githubAcct);
            expect(engineer.getRole()).toEqual('Engineer');
        });
    })
});