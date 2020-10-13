// node modules
const util = require("util");
const path = require("path");
const fs = require("fs");

// path for employee output and save files
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const savedEmployeePath = path.join(OUTPUT_DIR, "saved-employees.json");

// promisified async read and write
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// imported project modules and classes
const render = require("./lib/htmlRenderer");
const prompt = require("./lib/prompts");
const createEmployee = require("./lib/create-employees");

// adds another employee into the employee array
// will keep adding employees into the array until the user prompts No for askAnother
async function addEmployee(employeeArray) {
    try {
        let addingEmployee = true;
        while (addingEmployee) {
            let another = await prompt.promptAnother();
            if (another.adding === false) {
                addingEmployee = false;
            } else {
                let newEmployee = await createEmployee.createEmployee();
                employeeArray.push(newEmployee);
                console.log("Employee added");
            }
        }
        return employeeArray;
    } catch (error) {
        console.log(error);
    }
}

// initialise function 
// reads all the saved employees and puts them into an array
// waits for user to add more employees
// concats the saved employees and new employees and renders the html
// writes the html to the team.html
// writes all the new employees to the saved employees file
async function init() {
    try {
        let employeeArray = [];
        let newEmployees = [];
        let html = "";

        const savedEmployees = await readFileAsync(savedEmployeePath, "utf-8");
        const parsedSavedEmployees = JSON.parse(savedEmployees);

        if (Object.keys(parsedSavedEmployees).length != 0) {
            employeeArray = createEmployee.createSavedEmployees(parsedSavedEmployees);
        }

        newEmployees = await addEmployee(employeeArray);
        employeeArray.concat(newEmployees);
        html = render(employeeArray);

        await writeFileAsync(savedEmployeePath, JSON.stringify(employeeArray, null, 2));
        await writeFileAsync(outputPath, html.replace(/,/g, ""));

        console.log("Web page generated");

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

init();