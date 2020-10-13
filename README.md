# Employee Summary Generator

[![GitHub issues](https://img.shields.io/github/issues/Conanas/employee-summary)](https://github.com/Conanas/employee-summary/issues) [![GitHub forks](https://img.shields.io/github/forks/Conanas/employee-summary)](https://github.com/Conanas/employee-summary/network) [![GitHub stars](https://img.shields.io/github/stars/Conanas/employee-summary)](https://github.com/Conanas/employee-summary/stargazers) [![GitHub license](https://img.shields.io/github/license/Conanas/employee-summary)](https://github.com/Conanas/employee-summary/blob/main/LICENSE)

A Node.js CLI application that auto builds a website with all of your employees in your company.

## Description

For team manager's that want to display a nicely formatted html roster. Upon start of the program, the user is asked to add an employee and is then asked for the employees name, id, email, role [Manager, Engineer, Intern] and then depending on the role the user is asked specific questions based on those roles. Eg. Managers have an office number, engineers have a github account and interns have a school they are from.

Once the user has provided the information then a html file is produced with all of the team members details, the file can then be displayed in a web browser where all of the provided information is displayed in a clean and tidy format.

The user can then come back at anytime to add extra employees to the page if needed. 

## Installation

1. Make sure Node.js is installed on your system.

2. Download the project as a zip file, unpack it where you would like it to be installed.

3. Open a terminal in the same folder and enter the following commands.

    1. `npm install`
    2. `node app.js`

## Tests

There are built in tests for the different JavaScript modules and classes for the application and they are run with Jest.

## Usage

Follow the on screen prompts and provide the information, please note that each prompt cannot be left empty and the email address has to be in a standard email address format.

## Video Demonstration

![Team Roster](https://media.giphy.com/media/jdbUVTv3aombcQWJtY/giphy.gif "Team Roster")

## Screenshot

![Team Roster](assets\screenshots\team-roster.png "Team Roster")