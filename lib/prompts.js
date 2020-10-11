const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");

module.exports = {
    promptEmployee: function() {
        return inquirer.prompt([{
                type: "input",
                message: "Enter Employees Name: ",
                name: "name"
            },
            {
                type: "input",
                message: "Enter Employees ID: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter Employees Email: ",
                name: "email"
            },
            {
                type: "list",
                message: "Enter Employees Role: ",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            }
        ]);
    },

    promptManager: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter Managers Office Number: ",
            name: "officeNumber"
        }]);
    },

    promptEngineer: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter Engineers Github Account Name: ",
            name: "github"
        }]);
    },

    promptIntern: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter Interns School: ",
            name: "school"
        }]);
    },

    promptAnother: function() {
        return inquirer.prompt([{
            type: "confirm",
            message: "Add an employee?",
            name: "adding"
        }])
    },

    createEmployee: async function(employeeAnswers) {
        try {
            let roleAnswers;
            let employee;
            switch (employeeAnswers.role) {
                case ("Manager"):
                    roleAnswers = await this.promptManager();
                    employee = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.officeNumber);
                    break;
                case ("Engineer"):
                    roleAnswers = await this.promptEngineer();
                    employee = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.github);
                    break;
                case ("Intern"):
                    roleAnswers = await this.promptIntern();
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
    },

    addEmployee: async function(employeeArray) {
        try {
            let addingEmployee = true;
            while (addingEmployee) {
                let another = await this.promptAnother();
                if (another.adding === false) {
                    addingEmployee = false;
                } else {
                    let employeeAnswers = await this.promptEmployee();
                    let employee = await this.createEmployee(employeeAnswers);
                    employeeArray.push(employee);
                }
            }
            return employeeArray;
        } catch (error) {
            console.log(error);
        }
    }
}