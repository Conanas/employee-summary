const Employee = require("./Employee");

// Engineer class that extends teh Employee class
// Engineer class contains the github attribute

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;