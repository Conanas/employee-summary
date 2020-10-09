const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptEmployee() {
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
}

function promptManager() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter Managers Office Number: ",
        name: "officeNumber"
    }]);
}

function promptEngineer() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter Engineers Github Account Name: ",
        name: "github"
    }]);
}

function promptIntern() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter Interns School: ",
        name: "school"
    }]);
}

async function createEmployee(employeeAnswers) {
    try {
        let roleAnswers;
        let employee;
        switch (employeeAnswers.role) {
            case ("Manager"):
                roleAnswers = await promptManager();
                employee = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.officeNumber);
                break;
            case ("Engineer"):
                roleAnswers = await promptEngineer();
                employee = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.github);
                break;
            case ("Intern"):
                roleAnswers = await promptIntern();
                employee = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, roleAnswers.school);
                break;
            default:
                console.log("No Role");
        }
        return employee;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function promptAnother() {
    return inquirer.prompt([{
        type: "list",
        message: "Add another employee?",
        choices: ["Yes", "No"],
        name: "adding"
    }])
}

async function init() {
    try {
        let employeeArray = [];
        let addingEmployee = true;
        let employeeAnswers;
        let employee;
        let another;
        while (addingEmployee) {
            employeeAnswers = await promptEmployee();
            employee = await createEmployee(employeeAnswers);
            employeeArray.push(employee);
            another = await promptAnother();
            if (another.adding === "No") {
                addingEmployee = false;
            }
        }

        console.log(JSON.stringify(employeeArray));
        console.log("Everything went well!");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```