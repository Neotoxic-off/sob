const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function commit(commit, emoji)
{
    const type = await inquirer.prompt([
        {
            type : "list",
            name : "type",
            message : "Commit type:",
            choices : commit["type"]
        }
    ])
    const commit_emoji = emoji["emoji"][commit["emoji"][type["type"]]]
    const commit_separator = emoji["separator"]
    const message = await inquirer.prompt([
        {
            type : "input",
            name : "message",
            message : "Commit message:"
        }
    ])
    const full_commit = `${commit_emoji} ${commit["emoji"][type["type"]].toUpperCase()}${commit_separator}${message["message"]}`

    await execute(`git commit -m "${full_commit}"`)
}

module.exports = commit;