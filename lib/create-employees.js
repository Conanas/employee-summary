const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const prompt = require("./prompts");

module.exports = {

    createEmployee: async function() {
        try {
            let roleAnswers;
            let employee;

            let answers = await prompt.promptAnswers();

            switch (answers.role) {
                case ("Manager"):
                    roleAnswers = await prompt.promptManager();
                    employee = new Manager(answers.name, answers.id, answers.email, roleAnswers.officeNumber);
                    break;
                case ("Engineer"):
                    roleAnswers = await prompt.promptEngineer();
                    employee = new Engineer(answers.name, answers.id, answers.email, roleAnswers.github);
                    break;
                case ("Intern"):
                    roleAnswers = await prompt.promptIntern();
                    employee = new Intern(answers.name, answers.id, answers.email, roleAnswers.school);
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
        savedEmployees.forEach((item) => {
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