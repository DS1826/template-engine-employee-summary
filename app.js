const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const teamArray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

// Inquirer Prompts 
// Include choice for type of employee: Manager, Engineer or Intern
// Use if else stmt for additional prompts?


createNewEmployee();

function createNewEmployee() {
    console.log(teamArray);
    inquirer.prompt([
        {
            type: "list",
            name: "new",
            message: "Do you want to create a new employee? If so, choose type.",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No"
            ]
        }
    ]).then(function(data) {
        if (data.new === "No") {
            writeFile();
        } else if (data.new === "Manager") {
            createManager();
        } else if (data.new === "Engineer") {
            createEngineer();
        } else {
            createIntern();
        }
    });
}

function createManager() {
    console.log("Creating Manager");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is the Manager's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email address?"
        },
        {
            type: "input",
            name: "office",
            message: "What is the Manager's office number?"
        }
    ]).then(function(data) {

        const employee = new Manager(data.name, data.id, data.email, data.office);
        teamArray.push(employee);
        createNewEmployee();

    });
}

function createEngineer() {
    console.log("Creating Engineer");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is the Engineer's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's GitHub username?"
        }
    ]).then(function(data) {

        const employee = new Manager(data.name, data.id, data.email, data.github);
        teamArray.push(employee);
        createNewEmployee();

    });
}

function createIntern() {
    console.log("Creating Intern");
}

function writeFile() {
    console.log("Creating File");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

