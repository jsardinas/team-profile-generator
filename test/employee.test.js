const Employee = require('../src/employee');

const name = 'Javier';
const email = `${name}@company.com`;

describe("Employee", () => {
    describe('Objct Creation', ()=> {
        it("should create an employee", () => {
            const employee = new Employee(name, email);
            expect(employee.name).toEqual(name);
            expect(employee.email).toEqual(email);
        });

        it("should return the appropiate role", () => {
            const employee = new Employee(name, email);
            expect(employee.getRole()).toEqual('Employee');
        });
    })
});