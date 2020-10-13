const inquirer = require("inquirer");

// contains the inquirer prompt functions for the user

module.exports = {

    // initial questions for every new employee
    promptAnswers: function() {
        return inquirer.prompt([{
                type: "input",
                message: "Enter Employees Name: ",
                name: "name",
                validate: function validate(name) {
                    let validInput = /^[A-Za-z '-]+$/.test(name)
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

    // prompt for if new Employee is a Manager and asks for officeNumber
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

    // prompt for if new Employee is an Engineer and asks for github account
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

    // prompt for if new Employee is an Intern and asks for the name of the school
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

    // prompt to ask the user if they would like to add another employee
    promptAnother: function() {
        return inquirer.prompt([{
            type: "confirm",
            message: "Add an employee?",
            name: "adding"
        }])
    },

}