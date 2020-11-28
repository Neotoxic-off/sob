'use strict';

var os = require('os');
var cp = require('child_process');
var extend = require('extend-shallow');

function branches(cwd, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = undefined;
  }

  var opts = extend({}, options, {cwd: cwd});

  cp.exec('git branch -a', opts, function(err, stdout, stderr) {
    if (err) {
      cb(err, null, stderr);
      return;
    }

    cb(null, parseBranches(stdout.toString()));
  });
}

branches.sync = function(cwd, options) {
  var execDefaults = {timeout: 3000, killSignal: 'SIGKILL'};
  var opts = extend({}, execDefaults, options, {cwd: cwd});
  var buf = cp.execSync('git branch -a', opts);
  return parseBranches(buf.toString());
};

function parseBranches(str) {
  if (!str) return [];
  var lines = str.trim().split(os.EOL);
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim().replace(/^\*\s*/, '');
    res.push(line.split('/').pop());
  }
  return res;
}

/**
 * Expose `branches`
 */

module.exports = branches;
