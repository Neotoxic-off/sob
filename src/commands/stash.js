// TOOLS
const execute = require("../tools/execute")

async function stash()
{
    await execute("git stash")
}

module.exports = stash;