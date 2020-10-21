// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./employee.js");

function Engineer(name, id, email, github) {
    Employee.call(this, name, id, email);
    this.github = github;
    this.getGithub = function() {
        return this.github;
    }
    this.getRole = function() {
        return "Engineer";
    
    }
}

module.exports = Engineer;