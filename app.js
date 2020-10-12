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
const createEmployee = require("./lib/create-employees");

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