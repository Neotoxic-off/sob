// TOOLS
const execute = require("../tools/execute")

async function pop()
{
    await execute("git pop")
}

module.exports = pop;