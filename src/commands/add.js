const inquirer = require("inquirer")

// TOOLS
const execute = require("../tools/execute")

async function add()
{
    const files = await inquirer.prompt([
        {
            type : "input",
            name : "files",
            message : "Files to add:"
        }
    ])

    await execute(`git add ${files["files"]}`);
}

module.exports = add;