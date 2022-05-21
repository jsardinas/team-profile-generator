const Manager = require('../src/manager');

const name = 'Javier';
const email = `${name}@company.com`;
const officeNumber = '42';

describe("Manager", () => {
    describe('Objct Creation', ()=> {
        it("should create an engineer", () => {
            const manager = new Manager(1, name, email, officeNumber);
            expect(manager.name).toEqual(name);
            expect(manager.email).toEqual(email);
            expect(manager.officeNumber).toEqual(officeNumber);
        });

        it("should return the appropiate role", () => {
            const manager = new Manager(1, name, email, officeNumber);
            expect(manager.getRole()).toEqual('Manager');
        });
    })
});