const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const util = require("util");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const savedEmployeePath = path.join(OUTPUT_DIR, "saved-employees.json");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const render = require("./lib/htmlRenderer");
const prompt = require("./lib/prompts");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function createEmployee(employeeAnswers) {
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
}

function createSavedEmployees(savedEmployees) {
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

async function init() {
    try {
        let employeeArray = [];

        const savedEmployees = await readFileAsync(savedEmployeePath, "utf-8");

        if (savedEmployees.length != 0) {
            employeeArray = createSavedEmployees(savedEmployees);
        }

        let addingEmployee = true;
        while (addingEmployee) {
            let another = await prompt.promptAnother();
            if (another.adding === false) {
                addingEmployee = false;
            } else {
                let employeeAnswers = await prompt.promptEmployee();
                let employee = await createEmployee(employeeAnswers);
                employeeArray.push(employee);
            }
        }

        await writeFileAsync(savedEmployeePath, JSON.stringify(employeeArray, null, 2));

        let html = render(employeeArray);

        await writeFileAsync(outputPath, html.replace(/,/g, ""));

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