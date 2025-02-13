#!/usr/bin/env node

const fs = require("fs")
const ora = require("ora")
const inquirer = require("inquirer")

// TOOLS
const banner = require("./tools/banner")

// COMMANDS
const add = require("./commands/add")
const commit = require("./commands/commit")
const pull = require("./commands/pull")
const push = require("./commands/push")
const template = require("./commands/template")
const checkout = require("./commands/checkout")
const clone = require("./commands/clone")
const stash = require("./commands/stash")
const status = require("./commands/status")

async function menu(commands)
{
    return (new Promise(async function(resolve, reject) {
        var result = await inquirer.prompt([
            {
                type : "list",
                name : "command",
                message : "Command:",
                choices : commands
            }
        ])

        resolve(result["command"])
    }))
}

async function init_settings()
{
    const spin = ora("Loading SOB").start()
    
    return (new Promise(function(resolve) {
        var result = JSON.parse(fs.readFileSync(`${process.env.HOME}/.sobrc`).toString())
        
        resolve(result)
        spin.succeed("SOB loaded")
    }))
}

export async function cli()
{
    const settings = await init_settings()
    await banner(settings)
    var command = null

    const commands = [
        "add",
        "commit",
        "push",
        "pull",
        "checkout",
        "stash",
        "pop",
        "template",
        "status",
        "exit"
    ]
    
    while (command != "exit") {
        command = await menu(commands)

        if (command == "add") {
            await add()
        }

        if (command == "commit") {
            await commit(settings["commit"], settings["emoji"])
        }
    
        if (command == "push") {
            await push()
        }

        if (command == "pull") {
            await pull()
        }

        if (command == "checkout") {
            await checkout()
        }

        if (command == "clone") {
            await clone()
        }

        if (command == "stash") {
            await stash()
        }

        if (command == "pop") {
            await stash()
        }

        if (command == "status") {
            await status()
        }

        if (command == "template") {
            await template()
        }
    
        if (command == "exit") {
            return (0)
        }
        command = null
    }

    return (-1)
}