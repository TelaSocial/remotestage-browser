var Application = require('spectron').Application;
var assert = require('assert');
var electron= require('electron-prebuilt');
var Promise = require('es6-promise').Promise;

app = new Application({
  path: electron, args:['.']
})

var success = function(result) {
    app.client.waitUntilTextExists('#message', 'success', 10000).then(function () {
        console.log('success');
    });
};

var error = function(reason) {
    // ... error handling code for a rejected promise
};

var promise = app.start();

promise.then(success, error);

console.log('!');
