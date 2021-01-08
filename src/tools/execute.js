const { exec } = require("child_process")

async function execute(data)
{
    return new Promise(function (resolve, reject) {
        exec(data, (err, stdout, stderr) => {
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

module.exports = execute