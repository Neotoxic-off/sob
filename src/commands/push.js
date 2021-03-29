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
            type : "list",
            name : "origin",
            message : "Origin:",
            choices: [
                "No",
                "Yes"
            ]
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
    var origin_branch = ""

    if (force["force"] == "Yes") {
        character = " -f"
    }
    if (origin["origin"] == "Yes") {
        origin_branch = "origin"
    }

    const full_push = `${origin_branch} ${branch["branch"]} ${character}`

    await execute(`git push ${full_push}`)
}

module.exports = push
