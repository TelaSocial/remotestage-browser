var Application = require('spectron').Application;
var assert = require('assert');
var electron= require('electron-prebuilt');

// Depends on Promises
//var Promise = require('es6-promise').Promise;

var app = new Application({
	path: electron, args:['.']
})

app.start().then(function ok() {
		app.client.waitUntilTextExists('#message', 'success', 10000).then(
			function success() {
				console.log('success');
				app.stop().then(function ok() {
					console.log('Quit ')
				});
			}
		);
});

console.log('Launching electron.. and waiting for inner page load!');
