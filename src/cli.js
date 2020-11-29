#!/usr/bin/env node

const fs = require("fs")
const ora = require("ora")
const inquirer = require("inquirer")
const { exec } = require("child_process");

const colors = require("./lib/colors");

async function banner(settings)
{
    var promise = new Promise(function(resolve) {
        let version = settings["version"]
        let welcome = `${colors.get("red")}Welcome in SOB${colors.get("yellow")}`
        let current = `Current version: ${colors.get("cyan")}${version}${colors.get("yellow")}`

        console.log(`\n  ${colors.get("yellow")}┌──────────────────────────────┐${colors.get("reset")}`)
        console.log(`  ${colors.get("yellow")}│                              │${colors.get("reset")}`)
        console.log(`  ${colors.get("yellow")}│       ${welcome}         │${colors.get("reset")}`)
        console.log(`  ${colors.get("yellow")}│    ${current}    │${colors.get("reset")}`)
        console.log(`  ${colors.get("yellow")}│                              │${colors.get("reset")}`)
        console.log(`  ${colors.get("yellow")}└──────────────────────────────┘\n${colors.get("reset")}`)
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
                reject(err);
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

    const full_push = `${origin["origin"]} ${branch["branch"]}`

    return new Promise(function (resolve, reject) {
        exec(`git push ${full_push}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
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
    const commit_emoji = emoji["emoji"][commit[commit["type"]]]
    const commit_separator = emoji["separator"]
    const message = await inquirer.prompt([
        {
            type : "input",
            name : "message",
            message : "Commit message:"
        }
    ])
    const full_commit = `${commit_emoji} ${type["type"].toUpperCase()}${commit_separator}${message["message"]}`

    return new Promise(function (resolve, reject) {
        exec(`git commit -m "${full_commit}"`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
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
    spin.color = "yellow"
    
    return (new Promise(async function(resolve, reject) {
        var result = JSON.parse(fs.readFileSync("./ressources/settings.json").toString())
        
        resolve(result)
        spin.succeed("CLI loaded")
    }))
}

async function init_commit()
{
    const spin = ora("Loading commit").start()
    spin.color = "yellow"
    
    return (new Promise(async function(resolve, reject) {
        var result = JSON.parse(fs.readFileSync("./ressources/commit/commit.json").toString())
        
        resolve(result)
        spin.succeed("Commit loaded")
    }));
}

async function init_emoji()
{
    const spin = ora("Loading commit emoji").start()
    spin.color = "yellow"

    return (new Promise(async function(resolve, reject) {
        var result = JSON.parse(fs.readFileSync("./ressources/commit/emoji.json").toString())
        
        resolve(result)
        spin.succeed("Commit emoji loaded")
    }))
}

export async function cli()
{
    const settings = await init_settings()
    const commit_settings = await init_commit()
    const commit_emoji = await init_emoji()
    await banner(settings)
    var command = null
    
    while (command != "exit") {
        command = await menu(settings)

        if (command == "add") {
            await sob_add()
        }

        if (command == "commit") {
            await sob_commit(commit_settings, commit_emoji)
        }
    
        if (command == "push") {
            await sob_push()
            console.log("\n!! in development !!\n")
        }
    
        if (command == "exit") {
            return (0)
        }
        command = null
    }

    return (-1)
}