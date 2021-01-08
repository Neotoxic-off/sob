const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function push()
{
    const force = await inquirer.prompt([
        {
            type : "list",
            name : "force",
            message : "Force:",
            choices: [
                "No",
                "Yes"
            ]
        }
    ])
    const origin = await inquirer.prompt([
        {
            type : "input",
            name : "origin",
            message : "Origin:"
        }
    ])
    const branch = await inquirer.prompt([
        {
            type : "input",
            name : "branch",
            message : "Branch to push:",
        }
    ])

    var character = ""

    if (force["force"] == "Yes") {
        character = " -f"
    }

    const full_push = `${origin["origin"]} ${branch["branch"]} ${character}`

    await execute(`git push ${full_push}`)
}

module.exports = push