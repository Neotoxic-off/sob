const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function clone()
{
    const method = await inquirer.prompt([
        {
            type : "list",
            name : "method",
            message : "Method:",
            choices : [
                "SSH",
                "HTTPS"
            ]
        }
    ])

    const support = await inquirer.prompt([
        {
            type : "list",
            name : "support",
            message : "Plateform:",
            choices : [
                "Github"
            ]
        }
    ])

    const repository = await inquirer.prompt([
        {
            type : "input",
            name : "repository",
            message : "Repository (username/project):",
        }
    ])

    if (repository != null) {
        var command = `git clone https://${support["support"].toLowerCase()}.com/${repository["repository"]}`

        if (method["method"] == "SSH") {
            command = `git clone git@${support["support"].toLowerCase()}.com:${repository["repository"]}.git`
        }

        await execute(command)
    }
}

module.exports = clone