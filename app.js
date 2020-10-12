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

async function init() {
    try {
        let employeeArray = [];
        let newEmployees = [];
        let html = "";

        const savedEmployees = await readFileAsync(savedEmployeePath, "utf-8");
        const parsedSavedEmployees = JSON.parse(savedEmployees);

        if (Object.keys(parsedSavedEmployees).length != 0) {
            employeeArray = prompt.createSavedEmployees(parsedSavedEmployees);
        }

        newEmployees = await prompt.addEmployee(employeeArray);
        employeeArray.concat(newEmployees);
        html = render(employeeArray);

        await writeFileAsync(savedEmployeePath, JSON.stringify(employeeArray, null, 2));
        await writeFileAsync(outputPath, html.replace(/,/g, ""));

        console.log("Employee Added");

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

init();