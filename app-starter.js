const Manager = require("./lib/Manager-starter");
const Engineer = require("./lib/engineer-starter");
const Intern = require("./lib/intern-starter");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      //
      // YOUR CODE HERE:
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's id?"
      },
      {
        type: "input",
        name: "office",
        message: "What is the manager's office number?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
      }
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      //
    ]).then(answers => {
      const manager = new Manager(answers.name, answers.id, answers.office, answers.email);
      teamMembers.push(manager);
      idArray.push(answers.id);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's id?"
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
      }
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      //
      // YOUR CODE HERE
      const engineers = new Engineer(answers.name, answers.id, answers.github, answers.email);
      teamMembers.push(engineers);
      idArray.push(answers.id);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
      }
    ]).then(answers => {
      //
      // YOUR CODE HERE
      const interns = new Intern(answers.name, answers.id, answers.school, answers.email);
      teamMembers.push(interns);
      idArray.push(answers.id);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
