const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeData = [];
let roleList = ["Manager", "Engineer", "Intern"];

const getEmployeeInfo = function() {
    inquirer.prompt(
        [{
            type: "input",
            message: "What is the employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's ID",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email"
        },
        {
            type: "list",
            message: "What is the employee's position?",
            name: "position",
            choices: roleList
        }]
    ).then(function(response){
        if (response.position === "Manager"){
            const newManager = new Manager(response.name, response.id, response.email);
        
            inquirer.prompt(
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: "officeNumber"
                }
            ).then(function(nextResponse){
                newManager.officeNumber = nextResponse.officeNumber
            
            createManagerHTML(newManager.getRole(), newManager.getName(), newManager.getId(), newManager.getEmail(), newManager.getOfficeNumber());
        })
    } else if (response.position === "Engineer"){
        const newEngineer = new Engineer(response.name, response.id, response.email);

        inquirer.prompt(
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "github"
            }
        ).then(function(response3){
            newEngineer.gitHub = response3.github

            createEngineerHTML(newEngineer.getRole(), newEngineer.getName(), newEngineer.getId(), newEngineer.getEmail(), newEngineer.getGithub());
        })
    } else if (response.position === "Intern"){
        const newIntern = new Intern(response.name, response.id, response.email);

        inquirer.prompt(
            {
                type: "input",
                message: "What school do you go to?",
                name: "school"
            }
        ).then(function(response4){
            newIntern.school = response4.school

            createInternHTML(newIntern.getRole(), newIntern.getName(), newIntern.getId(), newIntern.getEmail(), newIntern.getSchool())
        })
    }})}

    function createManagerHTML(role, name, id, email, officeNumber){
        fs.readFile("./templates/manager.html", "utf8", function(err,managerData){
            if (err){
                return console.log(err);
            }

        managerData = managerData.replace("{{ role }}", role).replace("{{ name }}", name).replace("{{ id }}", id).replace("{{ email }}", email).replace("{{ officeNumber }}", officeNumber)
        
        employeeData.push(managerData)
    
    })
    }

    function createEngineerHTML(role, name, id, email, gitHub){
        fs.readFile("./templates/manager.html", "utf8", function(err, engineerData){
            if (err){
                return console.log(err);
            }

        engineerData = engineerData.replace("{{ role }}", role).replace("{{ name }}", name).replace("{{ id }}", id).replace("{{ email }}", email).replace("{{ gitHub }}", gitHub)
        
        employeeData.push(engineerData)
    
    })
    }

    function createInternHTML(role, name, id, email, school){
        fs.readFile("./templates/manager.html", "utf8", function(err, internData){
            if (err){
                return console.log(err);
            }

        internData = internData.replace("{{ role }}", role).replace("{{ name }}", name).replace("{{ id }}", id).replace("{{ email }}", email).replace("{{ school }}", school)
        
        employeeData.push(internData)
    
    })
    }

    fs.readFile("./templates/main.html", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }

        data = data.replace("{{ team }}", employeeData.join(""));

        fs.writeFile("./output/team.html", data, function(err){
            if (err) {
                return console.log(err);
            }
            console.log("HTML Created Successfully!")
        });
    });

   getEmployeeInfo();

