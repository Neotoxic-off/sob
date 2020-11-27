#!/usr/bin/env node

const fs = require("fs")
const inquirer = require("inquirer")
const { exec } = require("child_process");

const colors = require("./lib/colors");

async function banner(settings)
{
    var promise = new Promise(function(resolve, reject) {
        let version = settings["version"]

        console.log(`${colors.get("yellow")}┌──────────────────────────────┐${colors.get("reset")}`)
        console.log(`${colors.get("yellow")}│                              │${colors.get("reset")}`)
        console.log(`${colors.get("yellow")}│       ${colors.get("red")}Welcome in SOB${colors.get("yellow")}         │${colors.get("reset")}`)
        console.log(`${colors.get("yellow")}│    Current version: ${colors.get("cyan")}${version}${colors.get("yellow")}    │${colors.get("reset")}`)
        console.log(`${colors.get("yellow")}│                              │${colors.get("reset")}`)
        console.log(`${colors.get("yellow")}└──────────────────────────────┘\n${colors.get("reset")}`)
        resolve(0);
    });
}

async function prompt()
{
    const commit = JSON.parse(fs.readFileSync("./ressources/commit.json").toString())
    const settings = JSON.parse(fs.readFileSync("./ressources/settings.json").toString())
    const types = [
        {
            type : "list",
            name : "type",
            message : "Commit type:",
            choices : settings["type"]
        }
    ]
    banner(settings)
    const type = await inquirer.prompt(types)
    const commit_emoji = commit["emoji"][type["type"]]
    const commit_separator = commit["separator"]
    const messages = [
        {
            type : "input",
            name : "message",
            message : "Commit message:"
        }
    ]
    const message = await inquirer.prompt(messages)

    const full_commit = `${commit_emoji} ${type["type"].toUpperCase()}${commit_separator}${message["message"]}`

    exec(`git commit -m "${full_commit}"`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}

export async function cli(args)
{
    await prompt()

    return (0)
}