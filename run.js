var Application = require('spectron').Application;
var assert = require('assert');
var electron= require('electron-prebuilt');
//var Promise = require('es6-promise').Promise;

var app = new Application({
  path: electron, args:['.']
})

var success = function(result) {
    app.client.waitUntilTextExists('#message', 'success', 10000).then(function () {
        console.log('success');
	app.stop();
    });
};

var error = function(reason) {
};

var promise = app.start();

promise.then(success, error);

console.log('Launching electron.. and waiting for inner page load!');
