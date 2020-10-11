const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const prompt = require("./prompts");

module.exports = {

    createEmployee: async function(employeeAnswers) {
        try {
            let roleAnswers;
            let employee;
            switch (employeeAnswers.role) {
                case ("Manager"):
                    roleAnswers = await prompt.promptManager();
                    employee = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.officeNumber);
                    break;
                case ("Engineer"):
                    roleAnswers = await prompt.promptEngineer();
                    employee = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.github);
                    break;
                case ("Intern"):
                    roleAnswers = await prompt.promptIntern();
                    employee = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.school);
                    break;
                default:
                    console.log("No Role");
            }
            return employee;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    },

    createSavedEmployees: function(savedEmployees) {
        let employeeArray = [];
        JSON.parse(savedEmployees).forEach((item) => {
            let employee;
            if (item.role === "Manager") {
                employee = new Manager(item.name, item.id, item.email, item.officeNumber);
            } else if (item.role === "Engineer") {
                employee = new Engineer(item.name, item.id, item.email, item.github);
            } else if (item.role === "Intern") {
                employee = new Intern(item.name, item.id, item.email, item.school);
            }
            employeeArray.push(employee);
        });
        return employeeArray;
    }

}