// TOOLS
const execute = require("../tools/execute")

async function status()
{
    await execute(`git status`)
}

module.exports = status