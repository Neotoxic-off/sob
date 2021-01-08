const colors = require('../tools/colors')

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

module.exports = banner;