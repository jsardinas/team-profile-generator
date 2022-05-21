const Intern = require('../src/intern');

const name = 'Javier';
const email = `${name}@company.com`;
const school = 'Hogwarts School of Witchcraft and Wizardry';

describe("Intern", () => {
    describe('Objct Creation', ()=> {
        it("should create an engineer", () => {
            const intern = new Intern(1, name, email, school);
            expect(intern.name).toEqual(name);
            expect(intern.email).toEqual(email);
            expect(intern.school).toEqual(school);
        });

        it("should return the appropiate role", () => {
            const intern = new Intern(1, name, email, school);
            expect(intern.getRole()).toEqual('Intern');
        });
    })
});