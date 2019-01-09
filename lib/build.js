var process = require('child_process');
var path = require("path");

var server = path.resolve(__dirname, "..", "node_modules/.bin/webpack-dev-server");
var config = path.resolve(__dirname, "..", "config/webpack.dev.conf.js")
var cmd = server + " --inline --progress --config " + config;

module.exports = function (options) {
    var workProcess = process.exec(cmd, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    workProcess.stdout.on('data', function (data) {
        console.log(data);
    });
}