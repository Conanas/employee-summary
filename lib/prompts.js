const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");

module.exports = {

    promptAnswers: function() {
        return inquirer.prompt([{
                type: "input",
                message: "Enter Employees Name: ",
                name: "name",
                validate: function validate(name) {
                    let validInput = /^[A-Za-z ']+$/.test(name)
                    if (validInput) {
                        return true;
                    } else {
                        console.log("\nName must not contain any special characters or numbers and must not be empty");
                        return false;
                    }
                }
            },
            {
                type: "input",
                message: "Enter Employees ID: ",
                name: "id",
                validate: function validate(id) {
                    if (id != "") {
                        return true;
                    } else {
                        console.log("\nID must not be empty");
                        return false;
                    }
                }
            },
            {
                type: "input",
                message: "Enter Employees Email: ",
                name: "email",
                validate: function validate(email) {
                    let validInput = /\S+@\S+\.\S+/.test(email)
                    if (validInput) {
                        return true;
                    } else {
                        console.log("\nEmail address not valid");
                        return false;
                    }
                }
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
            name: "officeNumber",
            validate: function validate(officeNumber) {
                let validInput = /^[0-9]+$/.test(officeNumber)
                if (validInput) {
                    return true;
                } else {
                    console.log("\nOffice Number must be a number");
                    return false;
                }
            }
        }]);
    },

    promptEngineer: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter Engineers Github Account Name: ",
            name: "github",
            validate: function validate(github) {
                if (github != "") {
                    return true;
                } else {
                    console.log("\nGitHub Account must not be empty");
                    return false;
                }
            }
        }]);
    },

    promptIntern: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter Interns School: ",
            name: "school",
            validate: function validate(school) {
                if (school != "") {
                    return true;
                } else {
                    console.log("\nSchool must not be empty");
                    return false;
                }
            }
        }]);
    },

    promptAnother: function() {
        return inquirer.prompt([{
            type: "confirm",
            message: "Add an employee?",
            name: "adding"
        }])
    },

    createEmployee: async function() {
        try {
            let roleAnswers;
            let employee;

            let answers = await this.promptAnswers();

            switch (answers.role) {
                case ("Manager"):
                    roleAnswers = await this.promptManager();
                    employee = new Manager(answers.name, answers.id, answers.email, roleAnswers.officeNumber);
                    break;
                case ("Engineer"):
                    roleAnswers = await this.promptEngineer();
                    employee = new Engineer(answers.name, answers.id, answers.email, roleAnswers.github);
                    break;
                case ("Intern"):
                    roleAnswers = await this.promptIntern();
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
    },

    addEmployee: async function(employeeArray) {
        try {
            let addingEmployee = true;
            while (addingEmployee) {
                let another = await this.promptAnother();
                if (another.adding === false) {
                    addingEmployee = false;
                } else {
                    let newEmployee = await this.createEmployee();
                    employeeArray.push(newEmployee);
                }
            }
            return employeeArray;
        } catch (error) {
            console.log(error);
        }
    }
}