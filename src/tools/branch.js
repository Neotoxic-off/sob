var branches = require('list-git-branches');

function get() {
    var cwd = '.';
    branches(cwd, function(err, res) {

    if (err) throw err;
        return (res);
    });
}

module.exports = get;