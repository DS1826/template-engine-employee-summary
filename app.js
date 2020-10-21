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

createNewEmployee();

function createNewEmployee() {
    // console.log(teamArray);
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

        const employee = new Engineer(data.name, data.id, data.email, data.github);
        teamArray.push(employee);
        createNewEmployee();

    });
}

function createIntern() {
    console.log("Creating Intern");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is the Intern's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "Which school is the Intern currently enrolled?"
        }
    ]).then(function(data) {

        const employee = new Intern(data.name, data.id, data.email, data.school);
        teamArray.push(employee);
        createNewEmployee();

    });
}

function writeFile() {
    console.log("Creating File");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

