const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function pull()
{
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
            message : "Branch to pull:",
        }
    ])

    const full_pull = `${origin["origin"]} ${branch["branch"]}`

    await execute(`git pull ${full_pull}`)
}

module.exports = pull;