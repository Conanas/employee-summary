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
    }
}