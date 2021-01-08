const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function checkout()
{
    const new_branch = await inquirer.prompt([
        {
            type : "list",
            name : "new_branch",
            message : "Create a new branch:",
            choices : ["Yes", "No"]
        }
    ])
    const branch = await inquirer.prompt([
        {
            type : "input",
            name : "branch",
            message : "Branch name to switch:",
        }
    ])
    var character = ""

    if (new_branch["new_branch"] == "Yes") {
        character = "-b "
    }

    await execute(`git checkout ${character}${branch["branch"]}`)
}

module.exports = checkout;