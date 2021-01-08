const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function template()
{
    const langage = await inquirer.prompt([
        {
            type : "list",
            name : "language",
            message : "Language:",
            choices : [
                "C"
            ]
        }
    ])

    var commands = "mkdir src | mkdir lib | mkdir include | touch .gitignore"

    await execute(commands)
}

module.exports = template;