#!/usr/bin/env node

const fs = require("fs")
const ora = require("ora")
const inquirer = require("inquirer")
const { exec } = require("child_process");
const express = require('express');

function colors(color)
{
    const data = {
        "reset"   : 0,
        "black"   : 30,
        "red"     : 31,
        "green"   : 32,
        "yellow"  : 33,
        "blue"    : 34,
        "magenta" : 35,
        "cyan"    : 36,
        "white"   : 37
    }

    return (`\x1b[${data[color]}m`)
}

async function banner(settings)
{
    var promise = new Promise(function(resolve) {
        const banner = settings["banner"]
            const banner_color = colors(banner["color"])
            const banner_padding = banner["padding"]
            const banner_version = banner["version"]
                const banner_version_message = banner_version["message"]
                    const banner_version_message_message = banner_version_message["message"]
                    const banner_version_message_color = colors(banner_version_message["color"])
                const banner_version_version = banner_version["version"]
                const banner_version_color = colors(banner_version["color"])
            const banner_welcome = banner["welcome"]
                const banner_welcome_message = banner_welcome["message"]
                const banner_welcome_color = colors(banner_welcome["color"])

        const welcome = `${banner_welcome_color}${banner_welcome_message}${banner_color}`
        const current = `${banner_version_message_color}${banner_version_message_message}${banner_version_color}${banner_version_version}${banner_color}`
        const reset = colors("reset")
        var spaces = ""

        for (let i = 0; i < banner_padding; i++) {
            spaces += " "
        }

        console.log("\n")
        console.log(`${spaces}${banner_color}┌──────────────────────────────┐${reset}`)
        console.log(`${spaces}${banner_color}│                              │${reset}`)
        console.log(`${spaces}${banner_color}│       ${welcome}         │    ${reset}`)
        console.log(`${spaces}${banner_color}│    ${current}    │            ${reset}`)
        console.log(`${spaces}${banner_color}│                              │${reset}`)
        console.log(`${spaces}${banner_color}└──────────────────────────────┘${reset}`)
        console.log("\n")
        resolve(promise);
    });
}

async function sob_add()
{
    const files = await inquirer.prompt([
        {
            type : "input",
            name : "files",
            message : "Files to add:"
        }
    ])

    const full_add = `${files["files"]}`

    return new Promise(function (resolve, reject) {
        exec(`git add ${full_add}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function sob_push()
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

    return new Promise(function (resolve, reject) {
        exec(`git push ${full_push}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function sob_pull()
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

    return new Promise(function (resolve, reject) {
        exec(`git pull ${full_pull}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function sob_checkout()
{
    const new_branch = await inquirer.prompt([
        {
            type : "list",
            name : "new_branch",
            message : "Create a new branch:",
            choices : ["Yes", "No"]
        }
    ])
    const branch = await inquirer.prompt([
        {
            type : "input",
            name : "branch",
            message : "Branch name to switch:",
        }
    ])
    var character = ""

    if (new_branch["new_branch"] == "Yes") {
        character = "-b "
    }

    return new Promise(function (resolve, reject) {
        exec(`git checkout ${character}${branch["branch"]}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function sob_clone()
{
    const method = await inquirer.prompt([
        {
            type : "list",
            name : "method",
            message : "Method:",
            choices : [
                "SSH",
                "HTTPS"
            ]
        }
    ])

    const support = await inquirer.prompt([
        {
            type : "list",
            name : "support",
            message : "Plateform:",
            choices : [
                "Github"
            ]
        }
    ])

    const repository = await inquirer.prompt([
        {
            type : "input",
            name : "repository",
            message : "Repository (username/project):",
        }
    ])

    if (repository != null) {
        var command = `git clone https://${support["support"].toLowerCase()}.com/${repository["repository"]}`

        if (method["method"] == "SSH") {
            command = `git clone git@${support["support"].toLowerCase()}.com:${repository["repository"]}.git`
        }

        return new Promise(function (resolve, reject) {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    if (stdout)
                        console.log(stdout)
                    resolve({ stdout, stderr });
                }
            })
        });
    }
}

async function sob_status()
{
    return new Promise(function (resolve, reject) {
        exec(`git status`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function sob_commit(commit, emoji)
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

    return new Promise(function (resolve, reject) {
        exec(`git commit -m "${full_commit}"`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                if (stdout)
                    console.log(stdout)
                resolve({ stdout, stderr });
            }
        })
    });
}

async function menu(settings)
{
    return (new Promise(async function(resolve, reject) {
        var result = await inquirer.prompt([
            {
                type : "list",
                name : "command",
                message : "Command:",
                choices : settings["commands"]
            }
        ])

        resolve(result["command"])
    }))
}

async function init_settings()
{
    const spin = ora("Loading CLI").start()
    
    return (new Promise(function(resolve, reject) {
        var result = JSON.parse(fs.readFileSync(`${process.env.HOME}/.sobrc`).toString())
        
        resolve(result)
        spin.succeed("CLI loaded")
    }))
}

export async function cli()
{
    const settings = await init_settings()
    await banner(settings)
    var command = null
    
    while (command != "exit") {
        command = await menu(settings)

        if (command == "add") {
            await sob_add()
        }

        if (command == "commit") {
            await sob_commit(settings["commit"], settings["emoji"])
        }
    
        if (command == "push") {
            await sob_push()
        }

        if (command == "pull") {
            await sob_pull()
        }

        if (command == "checkout") {
            await sob_checkout()
        }

        if (command == "clone") {
            await sob_clone()
        }

        if (command == "status") {
            await sob_status()
        }
    
        if (command == "exit") {
            return (0)
        }
        command = null
    }

    return (-1)
}